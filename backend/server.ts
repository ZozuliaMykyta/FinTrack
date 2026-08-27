import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorMiddleware";
import AuthUserRoutes from "./routes/AuthUserRoutes";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cookieParser());
//
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use("/api/auth", AuthUserRoutes);
// error handler middleware
app.use(errorHandler);

// connect to MongoDB
mongoose
  .connect(process.env.FinTrack_DATABASE_URL as string)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("Server is running on port 5000"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "backend is running" });
});
