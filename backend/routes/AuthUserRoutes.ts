import { Router } from "express";
import AuthUserContorller from "../controllers/AuthUserContorller";

const router = Router();

router.post("/signup", AuthUserContorller);

export default router;
