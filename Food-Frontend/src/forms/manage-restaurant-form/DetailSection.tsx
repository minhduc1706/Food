import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";

const DetailSection = () => {
  const { control } = useFormContext();
  return (
    <div className="space-y-2 ">
      <div className="">
        <h2 className="text-2xl font-bold">Details</h2>
        <FormDescription>Enter detail about your restaurant</FormDescription>
      </div>
      <FormField
        control={control}
        defaultValue=""
        name="restaurantName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex gap-4">
        <FormField
          control={control}
          defaultValue=""
          name="city"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          defaultValue=""
          name="country"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex gap-4">
        <FormField
          control={control}
          defaultValue=""
          name="deliveryPrice"
          render={({ field }) => (
            <FormItem className="max-w-[25%]">
              <FormLabel>Delivery Price ($)</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" placeholder="1.50"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          defaultValue=""
          name="estimatedDeliveryTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Delivery time (minutes)</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" placeholder="30" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default DetailSection;
