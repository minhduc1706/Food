import {
  useCreateRestaurant,
  useGetRestaurant,
  useUpdateRestaurant,
} from "src/api/restaurantApi";
import ManageRestaurantForm from "src/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateRestaurant } =
    useCreateRestaurant();
  const { getRestaurant, isLoading: isGetRestaurant } = useGetRestaurant();
  const { updateRestaurant, isLoading: isUpdateRestaurant } =
    useUpdateRestaurant();

  const isEditting = !!getRestaurant;

  if (isGetRestaurant) {
    return <span>Loading...</span>;
  }

  return (
    <ManageRestaurantForm
      onSave={isEditting ? updateRestaurant : createRestaurant}
      isLoading={isCreateRestaurant || isUpdateRestaurant}
      restaurant={getRestaurant}
    />
  );
};

export default ManageRestaurantPage;
