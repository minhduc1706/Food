import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import Restaurant, { MenuItemType } from "../models/restaurant";
import Order from "../models/order";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: number;
  }[];

  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
  deliveryTip: number;
  deliveryInstructions: string;
};

const calculateTotalAmount = (
  cartItems: { menuItemId: string; quantity: number }[],
  menuItems: MenuItemType[],
  deliveryPrice: number,
  deliveryTip: number
) => {
  let total = 0;
  cartItems.forEach((cartItem) => {
    const menuItem = menuItems.find(
      (item) => item._id.toString() === cartItem.menuItemId.toString()
    );
    if (menuItem) {
      total += menuItem.price * cartItem.quantity;
    }
  });
  total += deliveryPrice + deliveryTip;
  return total;
};

const CreateCheckoutSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body;

    const restaurant = await Restaurant.findById(
      checkoutSessionRequest.restaurantId
    );

    if (!restaurant) {
      const error: any = new Error("Restaurant not found");
      error.statusCode = 404;
      throw error;
    }

    const lineItems = createLineItems(
      checkoutSessionRequest,
      restaurant.menuItems
    );

    const totalAmount = calculateTotalAmount(
      checkoutSessionRequest.cartItems,
      restaurant.menuItems,
      restaurant.deliveryPrice,
      checkoutSessionRequest.deliveryTip || 0
    );

    const newOrder = new Order({
      restaurant: restaurant,
      user: req.userId,
      status: "placed",
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems,
      deliveryTip: checkoutSessionRequest.deliveryTip || 0,
      deliveryInstructions: checkoutSessionRequest.deliveryInstructions || "",
      totalAmount,
      createdAt: new Date(),
    });

    const session = await createSession(
      lineItems,
      newOrder._id.toString(),
      restaurant.deliveryPrice,
      restaurant._id.toString(),
      checkoutSessionRequest.deliveryTip || 0
    );

    if (!session.url) {
      return res.status(500).json({ message: "Error creating stripe session" });
    }
    await newOrder.save();
    res.json({ url: session.url });
  } catch (error) {
    next(error);
  }
};

const createLineItems = (
  checkoutSessionRequest: CheckoutSessionRequest,
  menuItems: MenuItemType[]
) => {
  const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
    const menuItem = menuItems.find(
      (item) => item._id.toString() === cartItem.menuItemId.toString()
    );

    if (!menuItem) {
      const error: any = new Error(
        `Menu item not found: ${cartItem.menuItemId}`
      );
      error.statusCode = 404;
      throw error;
    }

    const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: "usd",
        unit_amount: Math.round(menuItem.price * 100),
        product_data: {
          name: menuItem.name,
        },
      },
      quantity: cartItem.quantity,
    };

    return line_item;
  });

  return lineItems;
};

const createSession = async (
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  orderId: string,
  deliveryPrice: number,
  restaurantId: string,
  deliveryTip: number
) => {
  if (deliveryTip > 0) {
    const tipItem: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: "usd",
        unit_amount: Math.round(deliveryTip * 100),
        product_data: {
          name: "Delivery Tip",
        },
      },
      quantity: 1,
    };

    lineItems.push(tipItem);
  }

  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    payment_method_types: ["card"],
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery Fee",
          type: "fixed_amount",
          fixed_amount: {
            amount: Math.round(deliveryPrice * 100),
            currency: "usd",
          },
        },
      },
    ],
    mode: "payment",
    metadata: {
      orderId,
      restaurantId,
    },
    success_url: `${FRONTEND_URL}/order-status?success=true`,
    cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
  });

  return sessionData;
};

const stripeWebHookHandler = async (req: Request, res: Response) => {
  let event;
  try {
    const sig = req.headers["stripe-signature"];
    event = STRIPE.webhooks.constructEvent(
      req.body,
      sig as string,
      STRIPE_ENDPOINT_SECRET
    );
  } catch (error: any) {
    console.log(error);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const order = await Order.findById(event.data.object.metadata?.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (event.data.object.amount_total === null) {
      throw new Error("Amount total cannot be null");
    }
    order.totalAmount = event.data.object.amount_total / 100;
    order.status = "paid";

    await order.save();
  } else if (event.type === "checkout.session.async_payment_failed") {
    const order = await Order.findById(event.data.object.metadata?.orderId);
    if (order) {
      order.status = "failed";
      await order.save();
    }

    res.status(200).send();
  }

  const checkExpiredOrders = async () => {
    const now = new Date();
    const expirationTime = 30 * 60 * 1000;

    const orders = await Order.find({ status: "placed" });

    orders.forEach(async (order) => {
      if (now.getTime() - order.createdAt.getTime() > expirationTime) {
        order.status = "expired";
        await order.save();
      }
    });
  };

  setInterval(checkExpiredOrders, 5 * 60 * 1000);
};
export default {
  CreateCheckoutSession,
  stripeWebHookHandler,
};
