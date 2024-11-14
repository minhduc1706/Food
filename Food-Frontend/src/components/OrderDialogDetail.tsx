import { Order } from "src/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";

type OrderDetailDialogProps = {
  selectedOrder: Order | null;
  isDialogOpen: boolean;
  onClose: () => void;
};
const OrderDialogDetail = ({
  selectedOrder,
  isDialogOpen,
  onClose,
}: OrderDetailDialogProps) => {
  console.log("Selected Order:", JSON.stringify(selectedOrder, null, 2));

  return (
    <Dialog open={isDialogOpen} onOpenChange={onClose}>
      <DialogContent>
       
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialogDetail;
