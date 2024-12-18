import { CartItem } from "src/pages/DetailPage";
import { Restaurant } from "src/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  deliveryTip: number;
  removeFromCart: (cartItem: CartItem) => void;
  deliveryOptions: string;
};

const OrderSummary = ({
  restaurant,
  cartItems,
  deliveryTip,
  removeFromCart,
  deliveryOptions,
}: Props) => {
  const formatCurrency = (amount: number) => {
    const formattedAmount = amount.toFixed(2);
    return formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getSubTotalCost = () => {
    const totalInPence = cartItems.reduce(
      (total, cartItems) => total + cartItems.price * cartItems.quantity,
      0
    );
    const totalWithDelivery = totalInPence;
    return totalWithDelivery;
  };

  const getTotalCost = () => {
    return deliveryOptions === "priority"
      ? getSubTotalCost() + restaurant.deliveryPrice + deliveryTip + 19
      : getSubTotalCost() + restaurant.deliveryPrice + deliveryTip;
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item, index) => (
          <div className="flex justify-between" key={index}>
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-1">
              ${formatCurrency(item.price * item.quantity)}
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Trash
                      className="cursor-pointer hover:fill-red-500 transition-colors"
                      color="red"
                      size={20}
                      onClick={() => removeFromCart(item)}
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="bg-orange-500 text-white p-2 rounded-md translate-x-2"
                  >
                    <p>Delete</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${formatCurrency(getSubTotalCost())}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>${formatCurrency(restaurant.deliveryPrice)}</span>
          </div>
          {deliveryTip > 0 && (
            <div className="flex justify-between">
              <span>Delivery Tip</span>
              <span>${formatCurrency(deliveryTip)}</span>
            </div>
          )}
          {deliveryOptions === "priority" && (
            <div className="flex justify-between">
              <span>Priority Delivery</span>
              <span>$19.00</span>
            </div>
          )}
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>${formatCurrency(getTotalCost())}</span>
          </div>
          <span className="text-sm">(incl. fees and tax)</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
