import { Document, Types } from "mongoose";

export interface IMenuItem extends Document {
  _id: Types.ObjectId;
  name: string;
  price: number;
  description: string;
}
