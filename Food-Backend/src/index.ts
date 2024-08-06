import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import restaurantRouter from "./routes/restaurantRoute";
import { v2 as cloudinary } from "cloudinary";
import { errorHandler } from "./middleware/errorHandler";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("connected to database!"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/restaurants", restaurantRouter);

app.use(errorHandler);

app.listen(4000, () => {
  console.log("server started on localhost: 4000");
});
