import { Order } from "src/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useState } from "react";
import OrderDialogDetail from "./OrderDialogDetail";

type orderTableProps = {
  orders: Order[];
};
const OrderTable = ({ orders }: orderTableProps) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedOrder(null);
  };
  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Restaurant</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Delivery Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id} onClick={() => handleOpenDialog(order)}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.restaurant.restaurantName}</TableCell>
              <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                {order.deliveryDetails.addressLine1},{" "}
                {order.deliveryDetails.city}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <OrderDialogDetail
        selectedOrder={selectedOrder}
        isDialogOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </div>
  );
};

export default OrderTable;
