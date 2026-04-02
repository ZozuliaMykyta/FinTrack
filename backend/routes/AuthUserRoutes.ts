import { Router } from "express";
import UserSignUpContorller from "../controllers/UserSignUpContorller";
import emailVerifyController from "../controllers/emailVerifyController";

const router = Router();

router.post("/signup", UserSignUpContorller);
router.get("/verify-email", emailVerifyController);

export default router;
