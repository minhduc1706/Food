import mongoose, { Schema } from "mongoose";
import { IRestaurant } from "../interface";
import User from "./user";
import MenuItem from "./menuItem";

const restaurantcShema = new Schema<IRestaurant>(
  {
    user: { type: Schema.Types.ObjectId, ref: User, required: true },
    restaurantName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    deliveryPrice: {
      type: Number,
      required: true,
    },
    estimatedDeliveryTime: {
      type: Number,
      required: true,
    },
    cuisines: [
      {
        type: String,
        required: true,
      },
    ],
    menuItems: [
      { type: Schema.Types.ObjectId, ref: MenuItem, required: true },
    ],
    imageUrl: {
      type: String,
      required: true,
    },
    coordinates: {
      lat: Number,
      lon: Number,
    },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model<IRestaurant>("Restaurant", restaurantcShema);

export default Restaurant;
