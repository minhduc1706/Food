import mongoose, { Schema }from "mongoose";
import { IMenuItem } from "../interface";

const menuItemSchema = new Schema<IMenuItem>({
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  });
  
  const MenuItem = mongoose.model<IMenuItem>("MenuItem", menuItemSchema);
  export default MenuItem;