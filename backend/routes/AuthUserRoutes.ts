import { Router } from "express";
import UserSignUpContorller from "../controllers/UserSignUpContorller";

const router = Router();

router.post("/signup", UserSignUpContorller);

export default router;
