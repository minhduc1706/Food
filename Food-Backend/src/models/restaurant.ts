import mongoose, { InferSchemaType } from "mongoose";

const menuItemShema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: ()=> new mongoose.Types.ObjectId()
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description :{
    type: String,
    required: true,
  }
});

export type MenuItemType = InferSchemaType<typeof menuItemShema>

const restaurantShema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  restaurantName: {
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
  menuItems: [menuItemShema],
  imageUrl: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    required: true,
  },
  coordinates: {
    lat: Number,
    lon: Number,
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantShema);

export default Restaurant;
