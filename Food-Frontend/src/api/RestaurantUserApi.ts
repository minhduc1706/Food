import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";
import { Restaurant } from "src/types";
import { makeApiRequest } from "./ApiRequest";
import { useCallback } from "react";
import axios from "axios";

export const useGetRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getRestaurantRequest = useCallback(async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    return makeApiRequest<Restaurant>("/userRestaurants", {
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
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.data?.message === "Restaurant not found") {
            toast.info("You don't have a restaurant yet. Please create a new one!");
          } else {
            toast.error(
              "Unable to load your profile at this moment. Please try again later."
            );
          }
        } else {
          toast.error("An unexpected error occurred.");
        }
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

    return makeApiRequest<Restaurant>("/userRestaurants", {
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
        queryClient.invalidateQueries("getRestaurantRequest");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.message || "Failed to create restaurant";
          toast.error(errorMessage);
        }
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

      return makeApiRequest<Restaurant>("/userRestaurants", {
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
        queryClient.invalidateQueries("getRestaurantRequest");
      },
      onError: () => {
        toast.error("Failed to update restaurant. Please try again later.");
      },
    }
  );

  return { updateRestaurant, isLoading };
};
