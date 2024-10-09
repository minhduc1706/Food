import { useState } from "react";
import { Button } from "./ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const TipDeliveryOptions = () => {
  const [selectedTip, setSelectedTip] = useState<number | null>(null);

  const handleTipClick = (amount: number): void => {
    setSelectedTip(amount);
  };
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight">
          Tip your delivery man
        </CardTitle>
        <CardDescription>
          100% of the tips go to your delivery man, we don't deduct anything
          from it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
        <Button
            key="not-now"
            className={`transition-colors duration-200 ${
              selectedTip === 0
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            } hover:bg-gray-400`}
            onClick={() => handleTipClick(0)}
          >
            Not now
          </Button>
          {[5, 10, 15, 20].map((amount: number) => (
            <Button
              key={amount}
              className={`transition-colors duration-200 ${
                selectedTip === amount
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              } hover:bg-gray-400`}
              onClick={() => handleTipClick(amount)}
            >
              ${amount}
            </Button>
          ))}
        </div>
      </CardContent>
    </>
  );
};

export default TipDeliveryOptions;
