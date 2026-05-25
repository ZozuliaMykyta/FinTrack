import express from "express";
import getProfile from "../controllers/profileController";
import statusController from "../controllers/statusController";

const router = express.Router();

router.get("/status/:id", statusController);

export default router;
