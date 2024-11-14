import { useAuth0 } from "@auth0/auth0-react";
import { makeApiRequest } from "./ApiRequest";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Order } from "src/types";

type CheckoutSessionRequest = {
  cartItems: {
    menuItem: string;
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

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    console.log("Checkout Session Request:", checkoutSessionRequest);
    console.log("Access Token:", accessToken);

    const response = await makeApiRequest(
      "/order/checkout/create-checkout-session",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify(checkoutSessionRequest),
      }
    );
    return response;
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest, {
    onSuccess: () => {
      toast.success("Checkout session created successfully!");
      reset();
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to create checkout session.";
      toast.error(errorMessage);
      reset();
    },
  });

  if (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to create checkout session.";
    toast.error(errorMessage);
    reset();
  }

  return { createCheckoutSession, isLoading };
};

export const useGetOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getOrderDetails = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    const response = await makeApiRequest("/order", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response as Order[];
  };

  const { data: orders, isLoading } = useQuery("userOrders", getOrderDetails, {
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch user orders.";
      toast.error(errorMessage);
    },
  });

  return { orders, isLoading };
};
