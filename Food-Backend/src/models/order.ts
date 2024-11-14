import mongoose, { Schema } from "mongoose";
import { IOrder } from "../interface";
import MenuItem from "./menuItem";
import Restaurant from "./restaurant";
import User from "./user";

const DeliveryDetailsSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  addressLine1: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const CartItemSchema = new Schema({
  menuItem: { type: Schema.Types.ObjectId, ref: MenuItem, required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>(
  {
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: Restaurant,
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: User, required: true },
    deliveryDetails: { type: DeliveryDetailsSchema, required: true },
    cartItems: { type: [CartItemSchema], required: true },
    deliveryTip: { type: Number, default: 0 },
    deliveryInstructions: { type: String, default: "" },
    deliveryOptions: {
      type: String,
      enum: ["standard", "priority", "scheduled"],
    },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        "placed",
        "paid",
        "inProgress",
        "outForDelivery",
        "delivered",
        "expired",
        "canceled",
        "failed",
      ],
      default: "placed",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
