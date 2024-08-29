import { MenuItem as MenuItemType } from "src/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type Props = {
  menuItem: MenuItemType;
  addToCart: () => void;
};

const MenuItem = ({ menuItem, addToCart }: Props) => {
  return (
    <Card className="cursor-pointer border-slate-200">
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold flex justify-between items-center">
        <span>${menuItem.price}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="flex items-center bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                onClick={addToCart}
              >
                <Plus size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent

              side="right"
              className="bg-orange-500 text-white p-2 rounded-md translate-x-2"
            >
              <p>Add</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default MenuItem;
