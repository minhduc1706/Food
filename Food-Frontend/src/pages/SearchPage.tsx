import { useParams } from "react-router-dom";
import { useSearchRestaurants } from "src/api/RestaurantApi";
import SearchResultCard from "src/components/SearchResultCard";
import SearchResultInfo from "src/components/SearchResultInfo";

function SearchPage() {
  const { city } = useParams();
  const { results, isLoading } = useSearchRestaurants(city as string);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!city || !results || !results.data) {
    return <span>No result found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="" id="cuisines-list">
        insert cuisines here
      </div>
      <div className="flex flex-col gap-5" id="main-content">
        <SearchResultInfo total={results.pagination.total} city={city} />
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
