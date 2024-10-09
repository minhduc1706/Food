import { useState } from "react";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const DeliveryOptions = () => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined); // Khởi tạo state với string | undefined

  const handleOptionChange = (value: string) => {
    setSelectedOption(value); // Cập nhật giá trị được chọn
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight">Delivery options</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <RadioGroup value={selectedOption} onValueChange={handleOptionChange}>
          <Label
            htmlFor="standard"
            className="flex items-center space-x-2 p-2 rounded-lg border border-gray-300 hover:bg-gray-100 cursor-pointer transition"
          >
            <RadioGroupItem
              value="standard"
              id="standard"
              className={`h-6 w-6 border-2 border-gray-400 hover:border-black ${selectedOption === "standard" ? "border-4 border-black" : ""}`}
              checked={selectedOption === "standard"}
            />
            <span className="font-medium">Standard</span>
            <span className="text-gray-500">50 - 65 mins</span>
          </Label>

          <Label
            htmlFor="priority"
            className="flex items-center space-x-2 p-2 rounded-lg border border-gray-300 hover:bg-gray-100 cursor-pointer transition"
          >
            <RadioGroupItem
              value="priority"
              id="priority"
              className={`h-6 w-6 border-2 border-gray-400 hover:border-black ${selectedOption === "priority" ? "border-4 border-black" : ""}`}
              checked={selectedOption === "priority"}
            />
            <span className="font-medium">Priority</span>
            <span className="text-gray-500">45 - 55 mins</span>
            <span className="text-orange-500 font-semibold">+ $19.00</span>
          </Label>

          <Label
            htmlFor="scheduled"
            className="flex items-center space-x-2 p-2 rounded-lg border border-gray-300 hover:bg-gray-100 cursor-pointer transition"
          >
            <RadioGroupItem
              value="scheduled"
              id="scheduled"
              className={`h-6 w-6 border-2 border-gray-400 hover:border-black ${selectedOption === "scheduled" ? "border-4 border-black" : ""}`}
              checked={selectedOption === "scheduled"}
            />
            <span className="font-medium">Scheduled</span>
            <span className="text-gray-500">Select a date and time</span>
          </Label>
        </RadioGroup>
      </CardContent>
    </>
  );
};

export default DeliveryOptions;
