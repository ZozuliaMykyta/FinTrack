import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (process.env.NODE_ENV === "production") {
    console.error({
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      message: err.message,
    });
  } else {
    console.error({
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      message: err.message,
      stack: err.stack,
    });
  }

  if (err instanceof jwt.TokenExpiredError) {
    return res.status(410).json({ message: "Verification link expired" });
  }
  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(400).json({ message: "Invalid token" });
  }

  res.status(500).json({ error: "Internal Server Error" });
}

export default errorHandler;
