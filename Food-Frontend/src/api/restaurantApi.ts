import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";
import { Restaurant } from "src/types";
import { makeApiRequest } from "./apiRequest";

export const useCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const createRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    return makeApiRequest<Restaurant>("/restaurants", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: restaurantFormData,
    });
  };

  const { mutate: createRestaurant, isLoading } = useMutation(createRestaurantRequest, {
    onSuccess: () => {
      toast.success("Restaurant created successfully!");
      queryClient.invalidateQueries("restaurants");
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to create restaurant";
      toast.error(errorMessage);
    },
  });

  return { createRestaurant, isLoading };
};
