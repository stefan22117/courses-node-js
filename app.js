import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import errorHandler from "./middleware/error.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));

app.use("/videos", Routes.videos);
app.use("/branches", Routes.branches);
app.use("/courses", Routes.courses);
app.use("/auth", Routes.auth);

app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("mongoose connected");
    app.listen(process.env.PORT || 5000); //4000
  })
  .catch(() => {
    console.log("mongoose error");
  });
