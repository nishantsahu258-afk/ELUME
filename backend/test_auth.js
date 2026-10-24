import mongoose from "mongoose";
import http from "http";
import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "./server.js";
import User from "./models/User.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

let mongod = null;
let server = null;
let baseUrl = "";

async function startTestEnvironment() {
  // If no accessible cloud MongoDB is ready yet, spin up MongoMemoryServer for reliable offline testing
  try {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.disconnect();
    await mongoose.connect(uri);
    console.log("[Test DB] Connected to In-Memory MongoDB successfully");
  } catch (err) {
    console.log("[Test DB] In-Memory failed, attempting URI:", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
  }

  return new Promise((resolve) => {
    server = http.createServer(app);
    server.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://127.0.0.1:${port}`;
      console.log(`[Test Server] Listening on ${baseUrl}`);
      resolve();
    });
  });
}

async function request(path, options = {}) {
  const url = `${baseUrl}${path}`;
  const headers = {};

  // For state-changing requests, simulate browser's trusted Origin unless explicitly omitted
  if (!options.omitOrigin && options.method && options.method !== "GET" && options.method !== "HEAD") {
    headers["Origin"] = "http://localhost:5173";
  }

  if (options.body) {
    headers["Content-Type"] = "application/json";
  }

  // Merge custom headers (allows overriding or omitting Origin)
  Object.assign(headers, options.headers || {});

  if (options.omitOrigin) {
    delete headers["Origin"];
  }

  const res = await fetch(url, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  const cookies = res.headers.get("set-cookie");

  return {
    status: res.status,
    data,
    cookies,
  };
}

async function runTests() {
  console.log("==========================================");
  console.log("   ELUME BACKEND AUTHENTICATION TEST SUITE ");
  console.log("==========================================\n");

  await startTestEnvironment();

  let testPassedCount = 0;
  let totalTests = 0;

  function assert(condition, testName) {
    totalTests++;
    if (condition) {
      console.log(`  PASS: [${testName}]`);
      testPassedCount++;
    } else {
      console.error(`  FAIL: [${testName}]`);
    }
  }

  try {
    // 1. Health check
    const health = await request("/api/health");
    assert(health.status === 200 && health.data.status === "ok", "API Health check");

    // 2. User registration
    const regRes = await request("/api/auth/register", {
      method: "POST",
      body: {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      },
    });
    assert(regRes.status === 201 && regRes.data.success === true, "User registration success");
    assert(regRes.data.user.name === "Test User", "User name returned in registration");
    assert(regRes.data.user.password === undefined, "Password NOT exposed in registration response");
    assert(regRes.cookies && regRes.cookies.includes("token="), "HttpOnly token cookie set on registration");
    assert(regRes.cookies && regRes.cookies.toLowerCase().includes("httponly"), "Cookie marked HttpOnly");

    // Check DB directly for password hashing
    const dbUser = await User.findOne({ email: "test@example.com" });
    assert(dbUser && dbUser.password !== "password123", "Password is encrypted (hashed with bcrypt) in MongoDB");

    // 3. Duplicate email registration
    const dupRes = await request("/api/auth/register", {
      method: "POST",
      body: {
        name: "Another User",
        email: "test@example.com",
        password: "newpassword123",
      },
    });
    assert(dupRes.status === 400 && dupRes.data.success === false, "Prevent duplicate email registration");

    // 4. Login with correct credentials
    const loginRes = await request("/api/auth/login", {
      method: "POST",
      body: {
        email: "test@example.com",
        password: "password123",
      },
    });
    assert(loginRes.status === 200 && loginRes.data.success === true, "Login with valid credentials");
    assert(loginRes.cookies && loginRes.cookies.includes("token="), "HttpOnly token cookie set on login");
    
    // Extract token cookie for subsequent authenticated requests
    const cookieHeader = loginRes.cookies.split(";")[0];

    // 5. Login with invalid credentials
    const invalidLogin = await request("/api/auth/login", {
      method: "POST",
      body: {
        email: "test@example.com",
        password: "wrongpassword",
      },
    });
    assert(invalidLogin.status === 401 && invalidLogin.data.success === false, "Reject invalid password login");

    // 6. Get Current User (/api/auth/me) with cookie
    const meRes = await request("/api/auth/me", {
      headers: { Cookie: cookieHeader },
    });
    assert(meRes.status === 200 && meRes.data.success === true, "Session check (/api/auth/me) with cookie");
    assert(meRes.data.user.email === "test@example.com", "Me endpoint returns correct user");
    assert(meRes.data.user.password === undefined, "Me endpoint does NOT expose password");

    // 7. Protected route without cookie
    const unauthRes = await request("/api/auth/me");
    assert(unauthRes.status === 401 && unauthRes.data.success === false, "Reject /api/auth/me without cookie");

    // Invalid email format test
    const badEmailRes = await request("/api/auth/register", {
      method: "POST",
      body: { name: "Bad", email: "not-an-email", password: "password123" },
    });
    assert(badEmailRes.status === 400 && badEmailRes.data.success === false, "Reject invalid email format");

    // CSRF rejection test (unauthorized origin)
    const csrfRes = await request("/api/auth/login", {
      method: "POST",
      headers: { Origin: "http://malicious-site.com" },
      body: { email: "test@example.com", password: "password123" },
    });
    assert(csrfRes.status === 403 && csrfRes.data.success === false, "CSRF: Reject cross-site request from untrusted origin");

    // Password change without currentPassword test
    const noCurrentPassRes = await request("/api/auth/profile", {
      method: "PUT",
      headers: { Cookie: cookieHeader },
      body: { newPassword: "newpassword456" },
    });
    assert(noCurrentPassRes.status === 400 && noCurrentPassRes.data.success === false, "Password change requires currentPassword");

    // Password change with incorrect currentPassword test
    const wrongCurrentPassRes = await request("/api/auth/profile", {
      method: "PUT",
      headers: { Cookie: cookieHeader },
      body: { currentPassword: "wrongpassword", newPassword: "newpassword456" },
    });
    assert(wrongCurrentPassRes.status === 400 && wrongCurrentPassRes.data.success === false, "Reject password change with incorrect current password");

    // 8. Profile update (name and password with valid currentPassword)
    const updateRes = await request("/api/auth/profile", {
      method: "PUT",
      headers: { Cookie: cookieHeader },
      body: {
        name: "Test User Updated",
        currentPassword: "password123",
        newPassword: "newpassword456",
      },
    });
    assert(updateRes.status === 200 && updateRes.data.success === true, "Update profile & password with valid current password");
    assert(updateRes.data.user.name === "Test User Updated", "Updated name reflected in response");

    // 1. Profile update via PATCH with Valid Origin
    const patchValidOriginRes = await request("/api/auth/profile", {
      method: "PATCH",
      headers: {
        Cookie: cookieHeader,
        Origin: "http://localhost:5173",
      },
      body: { name: "Test User PATCH Valid Origin" },
    });
    assert(
      patchValidOriginRes.status === 200 &&
        patchValidOriginRes.data.success === true &&
        patchValidOriginRes.data.user.name === "Test User PATCH Valid Origin",
      "PATCH profile update with valid origin"
    );

    // 2. Profile update via PATCH with Missing Origin but Valid Referer (fallback check)
    const patchValidRefererRes = await request("/api/auth/profile", {
      method: "PATCH",
      omitOrigin: true,
      headers: {
        Cookie: cookieHeader,
        Referer: "http://localhost:5173/profile",
      },
      body: { name: "Test User PATCH Valid Referer" },
    });
    assert(
      patchValidRefererRes.status === 200 &&
        patchValidRefererRes.data.success === true &&
        patchValidRefererRes.data.user.name === "Test User PATCH Valid Referer",
      "PATCH profile update with missing origin but valid Referer"
    );

    // 3. Profile update via PATCH with Untrusted Origin (must be rejected)
    const patchUntrustedOriginRes = await request("/api/auth/profile", {
      method: "PATCH",
      headers: {
        Cookie: cookieHeader,
        Origin: "http://untrusted-attacker.com",
      },
      body: { name: "Attacker Name" },
    });
    assert(
      patchUntrustedOriginRes.status === 403 &&
        patchUntrustedOriginRes.data.success === false,
      "PATCH profile update rejected with untrusted origin (CSRF protection)"
    );

    // 4. Profile update via PATCH with null Origin (sandboxed iframe / privacy context)
    const patchNullOriginRes = await request("/api/auth/profile", {
      method: "PATCH",
      headers: {
        Cookie: cookieHeader,
        Origin: "null",
      },
      body: { name: "Null Origin Name" },
    });
    assert(
      patchNullOriginRes.status === 403 &&
        patchNullOriginRes.data.success === false,
      "PATCH profile update rejected with null origin (CSRF protection)"
    );

    // 5. Profile update via PATCH with Missing Origin and Untrusted Referer (must be rejected)
    const patchUntrustedRefererRes = await request("/api/auth/profile", {
      method: "PATCH",
      omitOrigin: true,
      headers: {
        Cookie: cookieHeader,
        Referer: "http://untrusted-site.com/malicious-page",
      },
      body: { name: "Malicious Referer Name" },
    });
    assert(
      patchUntrustedRefererRes.status === 403 &&
        patchUntrustedRefererRes.data.success === false,
      "PATCH profile update rejected with untrusted Referer (CSRF protection)"
    );

    // 6. Profile update via PATCH with Missing BOTH Origin and Referer (must be rejected)
    const patchMissingBothRes = await request("/api/auth/profile", {
      method: "PATCH",
      omitOrigin: true,
      headers: { Cookie: cookieHeader },
      body: { name: "Missing Both Headers Name" },
    });
    assert(
      patchMissingBothRes.status === 403 &&
        patchMissingBothRes.data.success === false,
      "PATCH profile update rejected when both Origin and Referer are missing (CSRF protection)"
    );

    // 9. Login with new password
    const newLoginRes = await request("/api/auth/login", {
      method: "POST",
      body: {
        email: "test@example.com",
        password: "newpassword456",
      },
    });
    assert(newLoginRes.status === 200 && newLoginRes.data.success === true, "Login with newly updated password");

    // 10. Logout
    const logoutRes = await request("/api/auth/logout", {
      method: "POST",
      headers: { Cookie: cookieHeader },
    });
    assert(logoutRes.status === 200 && logoutRes.data.success === true, "Logout successfully clears session");

    console.log("\n==========================================");
    console.log(`Results: ${testPassedCount} / ${totalTests} tests passed`);
    console.log("==========================================\n");

  } catch (err) {
    console.error("Test execution error:", err);
  } finally {
    if (server) server.close();
    if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
    if (mongod) await mongod.stop();
  }
}

runTests();
