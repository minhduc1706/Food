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
      const error: any = new Error("User already exists");
      error.status = 409;
      return next(error);
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
      const error: any = new Error("User not found");
      error.status = 404;
      return next(error);
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
