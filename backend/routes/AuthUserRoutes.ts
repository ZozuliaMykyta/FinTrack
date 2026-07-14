import { Router } from "express";
import UserSignUpContorller from "../controllers/UserSignUpContorller";
import emailVerifyController from "../controllers/emailVerifyController";
import statusController from "../controllers/statusController";
import tokenVerifyController from "../controllers/tokenVerifyController";

const router = Router();

router.post("/signup", UserSignUpContorller);
router.post("/verify-email", emailVerifyController);
router.get("/status/:id", statusController);
router.post("/token", tokenVerifyController);

export default router;
