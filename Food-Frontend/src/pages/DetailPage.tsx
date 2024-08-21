import { useParams } from "react-router-dom";
import { useGetRestaurant } from "src/api/RestaurantListApi";
import MenuItem from "src/components/MenuItem";
import RestaurantInfo from "src/components/RestaurantInfo";
import { AspectRatio } from "src/components/ui/aspect-ratio";

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);


  if (isLoading || !restaurant) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant}/>
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem, index) => (
            <MenuItem menuItem={menuItem} key={index}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
