import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import jwt from "jsonwebtoken";
import emailTransport from "../utils/emailTransport";
const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: username,
      email,
      password: hashedPassword,
      isEmailVerified: false,
    });
    await newUser.save();

    const emailToken = jwt.sign(
      { email },
      process.env.EMAIL_SECRET || "your_secret",
      {
        expiresIn: "1d",
      },
    );
    const verificationLink = `${process.env.APP_URL}/verify-email?token=${emailToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email for FinTrack",
      text: `Click the link to verify your email: ${verificationLink}`,
    };
    await emailTransport.sendMail(mailOptions);
    res
      .status(201)
      .json({ message: "Registration successful. Verification email sent." });
  } catch (error) {
    next(error);
  }
};
export default signUpController;
