import { useQuery } from "react-query";
import { makeApiRequest } from "./ApiRequest";
import { toast } from "sonner";
import { RestaurantSearchResponse } from "src/types";
import { SearchState } from "src/pages/SearchPage";

export const useSearchRestaurants = (
  searchState: SearchState,
  city: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    return await makeApiRequest(
      `/restaurantsList/search/${city}?${params.toString()}`
    );
  };

  const {
    data: results,
    isLoading,
    error,
  } = useQuery(["searchRestaurants", searchState], createSearchRequest, {
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
