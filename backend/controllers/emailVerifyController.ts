import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const emailVerifyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token } = req.query;
    if (!token || typeof token !== "string") {
      return res.status(400).json({ message: "Invalid token" });
    }
    const decoded = jwt.verify(
      token,
      process.env.EMAIL_SECRET || "your_secret",
    ) as { email: string };
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    if (user.isEmailVerified) {
      return res.status(200).json({ message: "Email already verified" });
    }
    await user.updateOne({ isEmailVerified: true });
    res.status(200).json({ message: "Email was verified successfully" });
  } catch (error) {
    next(error);
  }
};
export default emailVerifyController;
