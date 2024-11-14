import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  auth0Id: string;
  email: string;
  name?: string;
  addressLine1?: string;
  city?: string;
  country?: string;
  createdAt: Date;
  updatedAt: Date;
}
