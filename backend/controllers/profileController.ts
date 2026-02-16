import { Request, Response } from "express";
import User from "../models/User";

const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {}
};
export default getProfile;
