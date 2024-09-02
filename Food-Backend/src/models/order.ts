import mongoose from "mongoose";

const orderShema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deliveryDetails: {
    email: { type: String, required: true },
    name: { type: String, required: true },
    addressLine1: { type: String, required: true },
    city: { type: String, required: true },
  },
  cartItems: [
    {
      menuItemid: { type: String, required: true },
      quantity: { type: Number, required: true },
      name: { type: String, required: true },
    },
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["placed", "paid", "inProgress", "outForDelivery", "delivered"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderShema);
export default Order;