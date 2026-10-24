import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  updateProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// Public auth endpoints with rate limiting
router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);
router.post("/logout", logoutUser);

// Protected auth endpoints (require valid HttpOnly token cookie)
router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);
router.patch("/profile", protect, updateProfile);

export default router;
