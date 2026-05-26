import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

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

    if (!user?.isEmailVerified) {
      return res.json({ isEmailVerified: false });
    }

    const sessionToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRETAFTERVERIFICATION ||
        "your_jwt_secret_after_verification",
      {
        expiresIn: "7d",
      },
    );
    res.status(200).json({
      message: "Email verified successfully",
      token: sessionToken,
      userId: user._id,
      isEmailVerified: true,
    });
  } catch (error) {
    next(error);
  }
};
export default statusController;
