import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSearchRestaurants } from "src/api/RestaurantListApi";
import CuisinesFilter from "src/components/CuisinesFilter";
import PaginationSelector from "src/components/PaginationSelector";
import SearchBar, { searchForm } from "src/components/SearchBar";
import SearchResultCard from "src/components/SearchResultCard";
import SearchResultInfo from "src/components/SearchResultInfo";
import SortOptionDropDown from "src/components/SortOptionDropDown";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

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
        />

       <div className="flex justify-between flex-col gap-3 lg:flex-row">
       <SearchResultInfo total={results.pagination.total} city={city} />
        <SortOptionDropDown
          onChange={(value) => setSortOption(value)}
          sortOption={searchState.sortOption}
        />
       </div>
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
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
