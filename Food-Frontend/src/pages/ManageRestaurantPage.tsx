import { useCreateRestaurant } from "src/api/restaurantApi"
import ManageRestaurantForm from "src/forms/manage-restaurant-form/ManageRestaurantForm"

const ManageRestaurantPage = () => {

  const {createRestaurant, isLoading} = useCreateRestaurant();

  return (
   <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading}/>
  )
}

export default ManageRestaurantPage 