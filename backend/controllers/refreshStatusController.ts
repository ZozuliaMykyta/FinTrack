import { Request, Response, NextFunction } from "express";
import User from "../models/User";
const refreshStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = res.locals.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      user: user,
      userId: user._id,
      isEmailVerified: user.isEmailVerified,
    });
  } catch (error) {
    next(error);
  }
};

export default refreshStatusController;
