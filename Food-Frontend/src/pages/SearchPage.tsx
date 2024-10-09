import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSearchRestaurants } from "src/api/RestaurantListApi";
import CuisinesFilter from "src/components/CuisinesFilter";
import PaginationSelector from "src/components/PaginationSelector";
import SearchBar, { searchForm } from "src/components/SearchBar";
import SearchResultCard from "src/components/SearchResultCard";
import SearchResultInfo from "src/components/SearchResultInfo";
import SortOptionDropDown from "src/components/SortOptionDropDown";
import { Restaurant } from "src/types";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function SearchPage() {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const { results, isLoading } = useSearchRestaurants(
    searchState,
    city as string
  );

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    if (results?.data) {
      setRestaurants(results.data);
    } else {
      setRestaurants([]);
    }
  }, [results]);

  const handleSearchSuggestions = async (query: string) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/restaurantsList/search/${city}`,
        {
          params: {
            searchQuery: query,
            page: 1,
            selectedCuisines: "",
            sortOption: "bestMatch",
          },
        }
      );
      setRestaurants(response.data?.data || []);
      return response.data?.data || [];
    } catch (error) {
      setRestaurants([]); 
    }
  };


  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchFormData: searchForm) => {
    setSearchState((prevState: SearchState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState: SearchState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!city || !results?.data) {
    return <span>No result found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="" id="cuisines-list">
        <CuisinesFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>
      <div className="flex flex-col gap-5" id="main-content">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by cuisines or restaurant name"
          onReset={resetSearch}
          searchType="cuisine"
          onSearchSuggestions={handleSearchSuggestions}
        />

        <div className="flex justify-between gap-3 ">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropDown
            onChange={(value) => setSortOption(value)}
            sortOption={searchState.sortOption}
          />
        </div>
        {restaurants.length > 0
          ? restaurants.map((restaurant) => (
              <SearchResultCard restaurant={restaurant} key={restaurant._id} />
            ))
          : ""}

        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default SearchPage;
