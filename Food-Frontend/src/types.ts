export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  description: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
};

export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type CartItem = {
  menuItem: MenuItem;
  quantity: number;
};

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered"
  | "expired"
  | "canceled"
  | "failed";

export type DeliveryOptions = "Standard" | "Priority" | "Scheduled";

export type Order = {
  _id: string;
  restaurant: Restaurant;
  user: string;
  deliveryDetails: User;
  cartItems: CartItem[];
  deliveryTip?: number;
  deliveryInstructions?: string;
  deliveryOptions: DeliveryOptions;
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
};
