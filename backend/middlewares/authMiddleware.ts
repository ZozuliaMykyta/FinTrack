import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sessionToken = req.cookies.sessionToken;
    if (!sessionToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(
      sessionToken,
      process.env.JWT_AUTH_SECRET || "jwt_auth_secret",
    );
    if (typeof decodedToken === "string" || !("id" in decodedToken)) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    res.locals.userId = String(decodedToken.id);
    next();
  } catch (error) {
    next(error);
  }
};
export default authMiddleware;
