import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetRestaurant } from "src/api/RestaurantListApi";
import MenuItem from "src/components/MenuItem";
import OrderSummary from "src/components/OrderSummary";
import RestaurantInfo from "src/components/RestaurantInfo";
import { AspectRatio } from "src/components/ui/aspect-ratio";
import { Card } from "src/components/ui/card";
import { MenuItem as MenuItemType } from "src/types";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};
const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => item._id !== cartItem._id
      );

      return updatedCartItems;
    });
  };
  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;
      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }
      return updatedCartItems;
    });
  };

  if (isLoading || !restaurant) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem, index) => (
            <MenuItem
              menuItem={menuItem}
              key={index}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>

        <div className="">
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
