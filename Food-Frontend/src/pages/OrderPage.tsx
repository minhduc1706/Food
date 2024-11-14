import { useGetOrder } from "src/api/OrderApi";
import OrderTable from "src/components/OrderTable";

const OrderPage = () => {
  const { orders, isLoading } = useGetOrder();

  if (isLoading) {
    return "Loading";
  }

  if (!orders || orders.length === 0) {
    return "no orders";
  }
  return <OrderTable orders={orders} />;
};

export default OrderPage;
