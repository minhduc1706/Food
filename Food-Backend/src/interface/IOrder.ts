import { Document } from "mongoose";
import { Types } from "mongoose";

export interface IDeliveryDetails {
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
}

export interface ICartItem {
  menuItem: Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  _id: Types.ObjectId;
  restaurant: Types.ObjectId;
  user: Types.ObjectId;
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
    country: string;
  };
  cartItems: {
    menuItem: Types.ObjectId;
    quantity: number;
  }[];
  deliveryTip: number;
  deliveryInstructions?: string;
  totalAmount: number;
  deliveryOptions: "standard" | "priority" | "scheduled";
  status:
    | "placed"
    | "paid"
    | "inProgress"
    | "outForDelivery"
    | "delivered"
    | "expired"
    | "canceled"
    | "failed";
  createdAt: Date;
  updatedAt: Date;
}
