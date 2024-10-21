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
import { Badge } from "./ui/badge";

type Props = {
  menuItem: MenuItemType;
  addToCart: () => void;
};

const MenuItem = ({ menuItem, addToCart }: Props) => {
  return (
    <Card className="cursor-pointer border-slate-200">
      <CardHeader>
        <CardTitle>
          {menuItem.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <p>{menuItem.description}</p>
          <div className="">
            <span className="text-orange-500 font-bold text-xl mr-2">
              ${menuItem.price}
            </span>
            <span className="text-gray-500 line-through">
              ${Math.round(menuItem.price * 1.1)};
            </span>
          </div>
          <span>
            <Badge className="bg-yellow-400 text-white px-2 py-1 rounded">
              Save ${Math.round(menuItem.price * 0.1)}
            </Badge>
          </span>
        </div>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
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
