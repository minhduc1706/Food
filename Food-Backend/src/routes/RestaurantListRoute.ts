import express from "express";
import { param } from "express-validator";
import RestaurantListController from "../controllers/RestaurantListController";

const router = express.Router();

router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("RestaurantID parameter must be a string"),
    RestaurantListController.getRestaurant
);

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a string"),
  RestaurantListController.searchRestaurants
);

export default router;
