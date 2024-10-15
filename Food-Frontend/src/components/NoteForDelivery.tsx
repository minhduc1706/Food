import { CardContent, CardHeader } from "./ui/card";
import { Textarea } from "./ui/textarea";

const NoteForDelivery = () => {
  return (
    <>
      <CardHeader className="text-2xl font-bold tracking-tight">Note for delivery man</CardHeader>
      <CardContent>
        <Textarea placeholder="Type your message here ..." />
      </CardContent>
    </>
  );
};

export default NoteForDelivery;
