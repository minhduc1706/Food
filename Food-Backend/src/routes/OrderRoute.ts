import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import OrderController from "../controllers/OrderController";

const router = express.Router();

router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  jwtParse,
  OrderController.CreateCheckoutSession
);

router.post(
  "/checkout/webhook",
  OrderController.stripeWebHookHandler
);
export default router;