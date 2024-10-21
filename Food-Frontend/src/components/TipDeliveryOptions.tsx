import { Button } from "./ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

type TipDeliveryOptionsProps = {
  deliveryTip: number;
  setDeliveryTip: React.Dispatch<React.SetStateAction<number>>;
};
const TipDeliveryOptions = ({
  deliveryTip,
  setDeliveryTip,
}: TipDeliveryOptionsProps) => {
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
              deliveryTip === 0
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            } hover:bg-gray-400`}
            onClick={() => setDeliveryTip(0)}
          >
            Not now
          </Button>
          {[5, 10, 15, 20].map((amount: number) => (
            <Button
              key={amount}
              className={`transition-colors duration-200 ${
                deliveryTip === amount
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              } hover:bg-gray-400`}
              onClick={() => setDeliveryTip(amount)}
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
