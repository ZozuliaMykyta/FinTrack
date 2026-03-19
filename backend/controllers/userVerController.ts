import { Request, Response, NextFunction } from "express";
import User from "../models/User";
const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.save();
  } catch (error) {
    next(error);
  }
};
