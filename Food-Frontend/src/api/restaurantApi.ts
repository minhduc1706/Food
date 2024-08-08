import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";
import { Restaurant } from "src/types";
import { makeApiRequest } from "./apiRequest";
import { useCallback } from "react";

export const useGetRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getRestaurantRequest = useCallback(async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    return makeApiRequest<Restaurant>("/restaurants", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }, [getAccessTokenSilently]);

  const {
    data: getRestaurant,
    isLoading,
    error,
  } = useQuery<Restaurant, Error>(
    "getRestaurantRequest",
    getRestaurantRequest,
    {
      onError: () => {
        toast.error(
          "Unable to load your profile at this moment. Please try again later."
        );
      },
    }
  );

  if (error) {
    toast.error("Something went wrong. Please try again.");
  }

  return {
    getRestaurant,
    isLoading,
  };
};

export const useCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const createRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    return makeApiRequest<Restaurant>("/restaurants", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: restaurantFormData,
    });
  };

  const { mutate: createRestaurant, isLoading } = useMutation(
    createRestaurantRequest,
    {
      onSuccess: () => {
        toast.success("Restaurant created successfully!");
        queryClient.invalidateQueries("restaurants");
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || "Failed to create restaurant";
        toast.error(errorMessage);
      },
    }
  );

  return { createRestaurant, isLoading };
};

export const useUpdateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const updateRestaurantRequest = useCallback(
    async (restaurantFormData: FormData): Promise<Restaurant> => {
      const accessToken = await getAccessTokenSilently();

      return makeApiRequest<Restaurant>("/restaurants", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: restaurantFormData,
      });
    },
    [getAccessTokenSilently]
  );

  const { mutateAsync: updateRestaurant, isLoading } = useMutation(
    updateRestaurantRequest,
    {
      onSuccess: () => {
        toast.success("Restaurant updated!");
        queryClient.invalidateQueries("fetchUserData");
      },
      onError: () => {
        toast.error("Failed to update restaurant. Please try again later.");
      },
    }
  );

  return { updateRestaurant, isLoading };
};
