import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Restaurant } from "src/types";

type Props = {
  restaurant: Restaurant;
};

function SearchResultCard({ restaurant }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleReadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  const MAX_LENGTH = 100;
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          alt={restaurant.restaurantName}
          className="rounded-full w-full h-full object-cover"
          loading="lazy"
        />
      </AspectRatio>
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {restaurant.restaurantName}
        </h3>
        <div className="flex justify-between gap-2" id="card-content">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row flex-wrap">
              {restaurant.cuisines.map((item, index) => (
                <span className="flex" key={index}>
                  <span>{item}</span>
                  {index < restaurant.cuisines.length - 1 && <Dot />}
                </span>
              ))}
            </div>
            <div className="">
              <p>
                {isExpanded
                  ? `${restaurant.description}`
                  : `${restaurant.description.slice(0, MAX_LENGTH)}...`}

                <span
                  onClick={toggleReadMore}
                  className="ml-2 underline underline-offset-2"
                >
                  {isExpanded ? "Show Less" : "Read More"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex gap-2 flex-col items-end flex-none">
            <div className="flex items-center gap-1">
              <Clock />
              {restaurant.estimatedDeliveryTime} mins
            </div>
            <div className="flex items-center gap-1">
              <Banknote />
              Delivery from ${restaurant.deliveryPrice}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SearchResultCard;
