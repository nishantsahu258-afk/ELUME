import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from the backend directory regardless of working directory
dotenv.config({ path: path.join(__dirname, ".env") });

// Connect to MongoDB
connectDB();

const app = express();

// Trust reverse proxy (required for Render / Vercel / Heroku to read real client IP and secure cookies)
app.set("trust proxy", 1);

// Allowed origins for CORS & CSRF (supports CLIENT_URL and FRONTEND_URL from environment)
const configuredClientUrls = [
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
]
  .filter(Boolean)
  .flatMap((url) => url.split(","))
  .map((url) => url.trim().replace(/\/$/, ""))
  .filter(Boolean);

const allowedOrigins = [
  ...configuredClientUrls,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

// Middleware configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true, // Allow cookies to be sent across origins
  })
);

app.use(express.json()); // Parses incoming JSON request bodies
app.use(cookieParser()); // Parses cookies from request headers

// CSRF Defense: Validate Origin & Referer on state-changing requests (POST, PUT, PATCH, DELETE)
app.use((req, res, next) => {
  // Safe HTTP methods do not mutate state
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    return next();
  }

  const origin = req.headers.origin;

  // 1. If Origin header is present (including "null" from sandboxed origins)
  if (origin) {
    if (origin === "null" || !allowedOrigins.includes(origin)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Cross-site request rejected (CSRF protection)",
      });
    }
    return next();
  }

  // 2. If Origin is missing, validate Referer against exact trusted frontend origin
  if (req.headers.referer) {
    try {
      const refererOrigin = new URL(req.headers.referer).origin;
      if (!allowedOrigins.includes(refererOrigin)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: Cross-site request rejected (CSRF protection)",
        });
      }
      return next();
    } catch {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Malformed Referer header",
      });
    }
  }

  // 3. If both Origin and Referer are missing on state-changing requests, reject
  return res.status(403).json({
    success: false,
    message: "Forbidden: Missing Origin or Referer header (CSRF protection)",
  });
});

// API Routes
app.use("/api/auth", authRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "ELUME Authentication API" });
});

// Fallback for undefined routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

// Only listen when server.js is executed directly (not when imported in tests)
const isDirectRun =
  process.argv[1] && process.argv[1].replace(/\\/g, "/").endsWith("server.js");

if (isDirectRun && process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`[ELUME Backend] Server running on port ${PORT}`);
  });
}

export default app;
