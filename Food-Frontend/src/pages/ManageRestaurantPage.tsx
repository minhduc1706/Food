import {
  useCreateRestaurant,
  useGetRestaurant,
  useUpdateRestaurant,
} from "src/api/RestaurantUserApi";
import ManageRestaurantForm from "src/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateRestaurant } =
    useCreateRestaurant();
  const { getRestaurant, isLoading: isGetRestaurant } = useGetRestaurant();
  const { updateRestaurant, isLoading: isUpdateRestaurant } =
    useUpdateRestaurant();

  if (isGetRestaurant) {
    return (
      <div className="flex flex-col gap-6 p-10">
        <div className="space-y-2 animate-pulse">
          <div className="bg-gray-300 rounded w-1/4 h-8"></div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <div className="bg-gray-300 rounded h-4"></div>
            <div className="bg-gray-300 rounded h-12"></div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="bg-gray-300 rounded h-4"></div>
            <div className="bg-gray-300 rounded h-12"></div>
          </div>
        </div>

        <div className="space-y-2 animate-pulse">
          <div className="bg-gray-300 rounded w-1/4 h-8"></div>
          <div className="grid grid-cols-5 gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="bg-gray-300 rounded h-12"></div>
            ))}
          </div>
        </div>

        <div className="space-y-2 animate-pulse">
          <div className="bg-gray-300 rounded w-1/4 h-8"></div>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="bg-gray-300 rounded w-full h-10"></div>
              </div>
            ))}
          </div>
          <div className="bg-gray-300 rounded w-1/4 h-10"></div>
        </div>

        <div className="space-y-2">
          <div className="bg-gray-300 rounded w-1/4 h-8"></div>
          <div className="animate-pulse aspect-ratio aspect-ratio-16/9">
            <div className="bg-gray-300 rounded-md object-cover h-full w-full"></div>
          </div>
          <div className="bg-gray-300 rounded h-10 w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <ManageRestaurantForm
      onSave={isGetRestaurant ? updateRestaurant : createRestaurant}
      isLoading={isCreateRestaurant || isUpdateRestaurant}
      restaurant={getRestaurant}
    />
  );
};

export default ManageRestaurantPage;
