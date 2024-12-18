import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useCreateCheckoutSession } from "src/api/OrderApi";
import { useGetRestaurantById } from "src/api/RestaurantListApi";
import CheckoutButton from "src/components/CheckoutButton";
import DeliveryOptions from "src/components/DeliveryOptions";
import MenuItem from "src/components/MenuItem";
import NoteForDelivery from "src/components/NoteForDelivery";
import OrderSummary from "src/components/OrderSummary";
import RestaurantInfo from "src/components/RestaurantInfo";
import TipDeliveryOptions from "src/components/TipDeliveryOptions";
import { AspectRatio } from "src/components/ui/aspect-ratio";
import { Card, CardFooter } from "src/components/ui/card";
import { UserFormData } from "src/forms/user-profile-form/UserProfileForm";
import { MenuItem as MenuItemType } from "src/types";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

type CheckoutSessionResponse = {
  url: string;
}

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurantById(restaurantId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storeCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storeCartItems ? JSON.parse(storeCartItems) : [];
  });

  const [deliveryTip, setDeliveryTip] = useState<number>(0);
  const [deliveryInstructions, setDeliveryInstructions] = useState<string>("");

  const [deliveryOptions, setDeliveryOptions] = useState<string>("standard");

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }
    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItem: cartItem._id,
        quantity: cartItem.quantity,
      })),
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
      restaurantId: restaurant?._id,
      deliveryTip,
      deliveryInstructions,
      deliveryOptions
    };

    let data: CheckoutSessionResponse;
    try {
      data = await createCheckoutSession(checkoutData) as CheckoutSessionResponse; 
      toast.success("Checkout session created successfully!");
      window.location.href = data.url;
    } catch (error) {
      console.log("checkoutData:", checkoutData);
      console.log(error);
      toast.error("Failed to create checkout session. Please try again.");
    }
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => item._id !== cartItem._id
      );

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
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

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };

  if (isLoading || !restaurant) {
    return (
      <div className="flex flex-col gap-10">
        <div className="animate-pulse">
          <div className="bg-gray-300 rounded-md aspect-ratio aspect-ratio-16/5 h-40"></div>
        </div>

        <div className="grid md:grid-cols-[4fr_2fr] gap-10">
          <div className="flex flex-col gap-4">
            <div className="bg-gray-300 rounded w-1/4 h-8"></div>
            <div className="bg-gray-300 rounded w-2/3 h-4 mb-4"></div>
            <div className="bg-gray-300 rounded w-full h-10"></div>
            <div className="bg-gray-300 rounded w-full h-10"></div>
            <div className="bg-gray-300 rounded w-full h-10"></div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="animate-pulse">
              <div className="bg-gray-300 rounded h-12 mb-4"></div>
            </div>
            <div className="animate-pulse">
              <div className="bg-gray-300 rounded h-12 mb-4"></div>
            </div>
            <div className="animate-pulse">
              <div className="bg-gray-300 rounded h-12 mb-4"></div>
            </div>
            <div className="animate-pulse">
              <div className="bg-gray-300 rounded h-12 mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>

      <div className="grid md:grid-cols-[4fr_2fr] gap-10">
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

        <div className="flex flex-col gap-5">
          <Card>
            <DeliveryOptions
              deliveryOptions={deliveryOptions}
              setDeliveryOptions={setDeliveryOptions}
            />
          </Card>

          <Card>
            <TipDeliveryOptions
              deliveryTip={deliveryTip}
              setDeliveryTip={setDeliveryTip}
            />
          </Card>

          <Card>
            <NoteForDelivery
              deliveryInstructions={deliveryInstructions}
              setDeliveryInstructions={setDeliveryInstructions}
            />
          </Card>

          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              deliveryTip={deliveryTip}
              removeFromCart={removeFromCart}
              deliveryOptions={deliveryOptions}
            />

            <CardFooter>
              <CheckoutButton
                onCheckout={onCheckout}
                disabled={cartItems.length === 0}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
