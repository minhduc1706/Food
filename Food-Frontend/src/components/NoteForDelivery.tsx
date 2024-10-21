import { CardContent, CardHeader } from "./ui/card";
import { Textarea } from "./ui/textarea";

type NoteForDeliveryProps = {
  deliveryInstructions: string;
  setDeliveryInstructions: React.Dispatch<React.SetStateAction<string>>;
};
const NoteForDelivery = ({
  deliveryInstructions,
  setDeliveryInstructions,
}: NoteForDeliveryProps) => {
  return (
    <>
      <CardHeader className="text-2xl font-bold tracking-tight">
        Note for delivery man
      </CardHeader>
      <CardContent>
        <Textarea
          value={deliveryInstructions}
          onChange={(e) => setDeliveryInstructions(e.target.value)}
          placeholder="Type your message here ..."
        />
      </CardContent>
    </>
  );
};

export default NoteForDelivery;
