import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

function SearchResultInfo({ total, city }: Props) {
  return (
    <div className="md:text-xl font-bold flex flex-col gap-3 justify-between lg:flex-row lg:items-center sm:text-base">
      <span>
        {total} Restaurants found in {city}
        <Link
          to="/"
          className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500"
        >
          Change location
        </Link>
      </span>
      
    </div>
  );
}

export default SearchResultInfo;
