import { Document } from "mongoose";
import { Types } from "mongoose";
import { IMenuItem } from "./IMenuItem";

export interface IRestaurant extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  restaurantName: string;
  description: string;
  country: string;
  city: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: IMenuItem[];
  imageUrl: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
