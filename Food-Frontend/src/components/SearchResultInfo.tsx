import { Link } from "react-router-dom";
import { Restaurant } from "src/types";

type Props = {
  total: number;
  city: string;
  restaurants: Restaurant[];
};

function SearchResultInfo({ total, city, restaurants }: Props) {
  return (
    <div className="md:text-xl font-bold flex flex-col gap-3 justify-between lg:flex-row lg:items-center sm:text-base">
      <span>
        {restaurants.length > 0 ? `${total} ` : "0 "}
        restaurants found in {city}
        <Link
          to="/"
          className="ml-1 text-sm font-semibold underline cursor-pointer text-orange-500"
        >
          Change location
        </Link>
      </span>
    </div>
  );
}

export default SearchResultInfo;
