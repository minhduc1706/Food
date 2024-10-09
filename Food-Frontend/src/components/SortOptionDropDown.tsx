import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown} from "lucide-react";
import { Fragment } from "react/jsx-runtime";

type Props = {
  onChange: (value: string) => void;
  sortOption: string;
};

const SORT_OPTIONS = [
  {
    label: "Best match",
    value: "bestMatch",
  },
  {
    label: "Delivery price",
    value: "deliveryPrice",
  },
  {
    label: "Estimated delivery time",
    value: "estimatedDeliveryTime",
  },
];

const SortOptionDropDown = ({ onChange, sortOption }: Props) => {
  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
    SORT_OPTIONS[0].label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer w-56" asChild>
        <Button variant="outline">
          Sort by: {selectedSortLabel}
          <ChevronDown className="size-5 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-gray-200 rounded-md shadow-lg mt-2 w-full text-center">
        {SORT_OPTIONS.map((option, index) => (
          <Fragment key={option.value}>
            <DropdownMenuItem
              className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition duration-200 ease-in-out"
              onClick={() => onChange(option.value)}
            >
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
