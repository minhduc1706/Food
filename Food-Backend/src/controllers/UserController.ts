import { NextFunction, Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { auth0Id } = req.body;

    const existingUser = await checkUserExists(auth0Id);

    if (existingUser) {
      return res.status(204).end();
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

const checkUserExists = async (auth0Id: string): Promise<boolean> => {
  try {
    const existingUser = await User.findOne({ auth0Id }).exec();

    return !!existingUser;
  } catch (error) {
    console.error(
      "Error checking user existence:",
      (error as Error).message || error
    );
    throw new Error("Error checking user existence");
  }
};

export default { getCurrentUser, createCurrentUser, updateCurrentUser };
