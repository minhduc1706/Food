import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown, Clock, DollarSign, Star } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

type Props = {
  onChange: (value: string) => void;
  sortOption: string;
};

const SORT_OPTIONS = [
  {
    label: "Best match",
    value: "bestMatch",
    icon: <Star className="h-5 w-5 text-gray-500" />,
  },
  {
    label: "Delivery price",
    value: "deliveryPrice",
    icon: <DollarSign className="h-5 w-5 text-gray-500" />,
  },
  {
    label: "Estimated delivery time",
    value: "estimatedDeliveryTime",
    icon: <Clock className="h-5 w-5 text-gray-500" />,
  },
];

const SortOptionDropDown = ({ onChange, sortOption }: Props) => {
  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
    SORT_OPTIONS[0].label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Button variant="outline">
          Sort by: {selectedSortLabel}
          <ChevronDown className="h-5 w-5 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-gray-200 rounded-md shadow-lg mt-2 w-48 text-center">
        {SORT_OPTIONS.map((option, index) => (
          <Fragment key={option.value}>
            <DropdownMenuItem
              className="cursor-pointer  px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition duration-200 ease-in-out"
              onClick={() => onChange(option.value)}
            >
              <span className="mr-2">{option.icon}</span>
              {option.label}
            </DropdownMenuItem>
            {index < SORT_OPTIONS.length - 1 && <DropdownMenuSeparator />}
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptionDropDown;
