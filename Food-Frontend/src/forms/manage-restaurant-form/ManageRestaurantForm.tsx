import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "src/components/ui/form";
import { z } from "zod";
import DetailSection from "./DetailSection";
import { Separator } from "src/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "src/components/LoadingButton";
import { Button } from "src/components/ui/button";

const formShema = z.object({
  restaurantName: z.string({
    required_error: "restaurant name is required",
  }),
  city: z.string({
    required_error: "city name is required",
  }),
  country: z.string({
    required_error: "country name is required",
  }),
  deliveryPrice: z.coerce.number({
    required_error: "delivery price is required",
    invalid_type_error: "price must be a valid number",
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "estimated delivery time is required",
    invalid_type_error: "time must be a valid number",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "please select at least 1 item",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "name is required"),
      price: z.coerce.number().min(1, "price is a number"),
    })
  ),
  imageFile: z.instanceof(File, { message: "image is required" }),
});

export type restaurantFormData = z.infer<typeof formShema>;

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<restaurantFormData>({
    resolver: zodResolver(formShema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  const onSubmit = (formDataJson: restaurantFormData) => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading? <LoadingButton/>: <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
