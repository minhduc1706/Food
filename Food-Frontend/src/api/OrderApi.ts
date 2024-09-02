import { useAuth0 } from "@auth0/auth0-react";
import { makeApiRequest } from "./ApiRequest";
import { useMutation } from "react-query";
import { toast } from "sonner";

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
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

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
    onError: () => {
      toast.error("Failed to create checkout session. Please try again.");
      reset();
    },
  });

  if (error) {
    toast.error("Failed to create checkout session. Please try again.");
    reset();
  }

  return { createCheckoutSession, isLoading };
};
