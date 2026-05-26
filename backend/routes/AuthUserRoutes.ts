import { Router } from "express";
import UserSignUpContorller from "../controllers/UserSignUpContorller";
import emailVerifyController from "../controllers/emailVerifyController";
import statusController from "../controllers/statusController";

const router = Router();

router.post("/signup", UserSignUpContorller);
router.post("/verify-email", emailVerifyController);
router.get("/status/:id", statusController);

export default router;
