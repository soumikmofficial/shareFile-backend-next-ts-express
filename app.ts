import "express-async-errors";
import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./db/connect";
import fileRouter from "./routes/fileRoutes";
import morgan from "morgan";
import { v2 as cloudinary } from "cloudinary";
import errorHandlerMiddleware from "./middlewares/error-handler";

// require("express-async-errors");
const app = express();

app.use(cors());
app.use(morgan("tiny"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// .............routes.........
app.use("/api/v1/file", fileRouter);

// ..........error handling........
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

connectDB();

const server = app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
