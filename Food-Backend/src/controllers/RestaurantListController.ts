import { NextFunction, Request, Response } from "express";
import Restaurant from "../models/restaurant";

const getRestaurantById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let restaurantId = req.params.restaurantId;
    const restaurant = await Restaurant.findById(restaurantId);

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

const searchRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const city = req.params.city;
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};

    query["city"] = new RegExp(city, "i");
    const cityCheck = await Restaurant.countDocuments(query);

    if (cityCheck === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      query["cuisines"] = { $all: cuisinesArray };
    }

    let searchQueryRegex;
    if (searchQuery) {
      searchQueryRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        { restaurantName: searchQueryRegex },
        { cuisines: { $in: [searchQueryRegex] } },
      ];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await Restaurant.countDocuments(query);

    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.error("Error in searchRestaurants:", error); // Log ra lỗi chi tiết
    next(error);
  }
};

const getAllRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurants = await Restaurant.find();
    if (restaurants.length === 0) {
      return res.status(404).json({ message: "No restaurants found" });
    }

    res.json(restaurants);
  } catch (error) {
    next(error);
  }
};

export default {
  searchRestaurants,
  getRestaurantById,
  getAllRestaurant,
};
