/**
 * Lightweight in-memory rate limiter for sensitive authentication routes
 * Mitigates brute-force credential stuffing and DoS attacks
 */
export const createRateLimiter = ({
  windowMs = 15 * 60 * 1000, // 15 minutes
  max = 30, // Max requests per window
  message = "Too many attempts from this IP, please try again later.",
} = {}) => {
  const requests = new Map();

  return (req, res, next) => {
    // Bypass in test mode so automated testing is not throttled
    if (process.env.NODE_ENV === "test") {
      return next();
    }

    const ip = req.ip || req.connection?.remoteAddress || "unknown";
    const now = Date.now();

    const record = requests.get(ip) || { count: 0, resetTime: now + windowMs };

    // Reset window if expired
    if (now > record.resetTime) {
      record.count = 0;
      record.resetTime = now + windowMs;
    }

    record.count += 1;
    requests.set(ip, record);

    if (record.count > max) {
      const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
      res.setHeader("Retry-After", retryAfterSeconds);
      return res.status(429).json({
        success: false,
        message,
      });
    }

    next();
  };
};

export const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 requests per 15 minutes per IP
  message: "Too many authentication attempts. Please try again after 15 minutes.",
});
