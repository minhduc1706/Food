import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/UserRoutes";
import userRestaurantstRouter from "./routes/UserRestaurantstRoute";
import restaurantListRouter from "./routes/RestaurantListRoute";
import { v2 as cloudinary } from "cloudinary";
import { errorHandler } from "./middleware/errorHandler";
import orderRoute from "./routes/OrderRoute";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("connected to database!"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());

app.use("/api/v1/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/userRestaurants", userRestaurantstRouter);
app.use("/api/v1/restaurantsList", restaurantListRouter);
app.use("/api/v1/order", orderRoute);

app.use(errorHandler);

app.listen(4000, () => {
  console.log("server started on localhost: 4000");
});
