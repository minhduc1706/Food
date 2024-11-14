import { OrderStatus } from "src/types";

type OrderStatusInfo = {
  label: string;
  value: OrderStatus;
  progressValue: number;
};

export const orderStatusProgress: OrderStatusInfo[] = [
  { label: "Placed", value: "placed", progressValue: 0 },
  { label: "Paid", value: "paid", progressValue: 20 },
  { label: "In Progress", value: "inProgress", progressValue: 40 },
  { label: "Out for Delivery", value: "outForDelivery", progressValue: 70 },
  { label: "Delivered", value: "delivered", progressValue: 100 },
  { label: "Expired", value: "expired", progressValue: 100 },
  { label: "Canceled", value: "canceled", progressValue: 100 },
  { label: "Failed", value: "failed", progressValue: 100 },
];
