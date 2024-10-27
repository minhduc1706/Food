import { Restaurant } from "src/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <div>
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">
            {restaurant.restaurantName}
          </CardTitle>
          <CardDescription>
            {restaurant.city}, {restaurant.country}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex">
          {restaurant.cuisines.map((item, index) => (
            <span className="flex" key={index}>
              <span>{item}</span>
              {index < restaurant.cuisines.length - 1 && <Dot />}
            </span>
          ))}
        </CardContent>
        <CardFooter>
            {restaurant.description}
        </CardFooter>
      </Card>
    </div>
  );
};

export default RestaurantInfo;
