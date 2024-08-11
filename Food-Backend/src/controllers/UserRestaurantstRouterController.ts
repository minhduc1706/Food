import { NextFunction, Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

const getRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      const error: any = new Error("Restaurant not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(restaurant);
  } catch (error) {
    next(error);
  }
};

const createRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const exsitingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (exsitingRestaurant) {
      return res.status(409).json({ message: "User restaurant already exist" });
    }

    const imageUrl = await uploadImage(req.file as Express.Multer.File);

    const restaurant = new Restaurant({
      ...req.body,
      imageUrl: imageUrl,
      user: new mongoose.Types.ObjectId(req.userId),
      lastUpdated: new Date(),
    });

    await restaurant.save();

    res.status(201).send(restaurant);
  } catch (error) {
    next(error);
  }
};

const updateRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      restaurantName,
      city,
      country,
      deliveryPrice,
      estimatedTimeDelivery,
      cuisines,
      menuItems,
      file,
    } = req.body;

    const restaurant = await Restaurant.findOne({
      user: req.userId,
    });

    if (!restaurant) {
      const error: any = new Error("Restaurant not found");
      error.statusCode = 404;
      throw error;
    }

    restaurant.restaurantName = restaurantName;
    restaurant.city = city;
    restaurant.country = country;
    restaurant.deliveryPrice = deliveryPrice;
    restaurant.estimatedDeliveryTime = estimatedTimeDelivery;
    restaurant.cuisines = cuisines;
    restaurant.menuItems = menuItems;
    restaurant.lastUpdated = new Date();

    if (file) {
      const imageUrl = await uploadImage(file as Express.Multer.File);
      restaurant.imageUrl = imageUrl;
    }

    await restaurant.save();
    res.status(200).send(restaurant);
  } catch (error) {
    next(error);
  }
};

export default { createRestaurant, getRestaurant, updateRestaurant };
