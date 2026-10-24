import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Protect middleware:
 * Checks for JWT stored inside an HttpOnly cookie named 'token'.
 * Verifies the token and attaches the authenticated user object to req.user.
 */
export const protect = async (req, res, next) => {
  try {
    // Read the JWT from HttpOnly cookie
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no session token found",
      });
    }

    // Verify token signature and expiration
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from MongoDB (excluding password hash)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account associated with this token no longer exists",
      });
    }

    // Attach user to request object so downstream controllers can access it
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Session expired or invalid. Please log in again.",
    });
  }
};
