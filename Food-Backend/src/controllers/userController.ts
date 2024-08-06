import { NextFunction, Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    next(error);
  }
};

const updateCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.addressLine1 = addressLine1 || user.addressLine1;
    user.country = country || user.country;
    user.city = city || user.city;

    await user.save();

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      const error: any = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(currentUser);
  } catch (error) {
    next(error);
  }
};

export default { getCurrentUser, createCurrentUser, updateCurrentUser };
