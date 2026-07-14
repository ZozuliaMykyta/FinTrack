import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const tokenVerifyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }
    jwt.verify(token, process.env.JWT_AUTH_SECRET || "jwt_auth_secret");
    res.status(200).json({ message: "Token is valid" });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
    next(error);
  }
};
export default tokenVerifyController;
