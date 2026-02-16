import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorMiddleware";

dotenv.config();

const app = express();

app.use(errorHandler);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "backend is running" });
});
