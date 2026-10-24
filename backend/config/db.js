import mongoose from "mongoose";
import dns from "node:dns";

// Fix Windows/ISP DNS resolution for MongoDB Atlas SRV records
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {
  // Use default if custom DNS cannot be set
}

/**
 * Connect to MongoDB database
 * Uses MONGODB_URI from environment variables (e.g. MongoDB Atlas connection string)
 */
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "elume",
    });
    console.log(
      `[MongoDB] Connected successfully: ${conn.connection.host} (Database: ${conn.connection.name})`
    );
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${error.message}`);
    // Don't kill process immediately in dev so developers see the exact error message
  }
};
