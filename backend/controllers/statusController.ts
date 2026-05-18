import { NextFunction, Request, Response } from "express";
import User from "../models/User";
const statusController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ isEmailVerified: user.isEmailVerified });
  } catch (error) {
    next(error);
  }
};
export default statusController;
