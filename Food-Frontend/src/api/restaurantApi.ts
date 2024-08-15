import { useQuery } from "react-query";
import { makeApiRequest } from "./ApiRequest";
import { toast } from "sonner";
import { RestaurantSearchResponse } from "src/types";

export const useSearchRestaurants = (city: string) => {
  const createSearchRequest = async () :Promise<RestaurantSearchResponse>=> {
    return await makeApiRequest(`/restaurantsList/search/${city}`);
  };

  const {
    data: results,
    isLoading,
    error,
  } = useQuery(["searchRestaurants"], createSearchRequest, {
    enabled: !!city,
    onError: () => {
      toast.error("Failed to fetch search results. Please try again later.");
    },
  });

  if (error) {
    toast.error("An error occurred while fetching data.");
  }

  return {
    results,
    isLoading,
  };
};
