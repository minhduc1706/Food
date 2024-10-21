import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Calendar } from "./ui/calendar";
import { useState } from "react";

type DeliveryOptionsProps = {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
};
const DeliveryOptions = ({
  selectedOption,
  setSelectedOption,
}: DeliveryOptionsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const currentDate = new Date();
  const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();

  const handleOptionChange = (value: string) => {
    if (value === "scheduled") {
      setIsDialogOpen(true);
    }
    setSelectedOption(value);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedOption("standard");
    setSelectedTime(null);
  };

  const maxSelectableDate = new Date();
  maxSelectableDate.setDate(currentDate.getDate() + 2);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${mins.toString().padStart(2, "0")} ${ampm}`;
  };

  const formatDateAndtime = (date: Date, time: string) => {
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    const dateNumber = date.getDate();
    return `${day} ${dateNumber}, ${time}`;
  };

  const isDateDisabled = (date: Date) => {
    return (
      date < new Date(currentDate.setHours(0, 0, 0, 0)) ||
      date > maxSelectableDate
    );
  };

  const roundToNext15Minutes = (time: number) => {
    return Math.ceil(time / 15) * 15;
  };

  const generateTimeSlots = (date: Date) => {
    const timeSlots = [];
    const isToday = date.toDateString() === currentDate.toDateString();
    let startTime: number;

    if (isToday) {
      // For today, start 1 hour from the current time, rounded to the next 15-minute mark
      startTime = roundToNext15Minutes(currentTime + 60); // 1 hour from now
    } else {
      // For future dates, start at 08:00 AM (480 minutes from midnight)
      startTime = 8 * 60; // 8:00 AM
    }

    const endTime = 24 * 60; // End time at midnight (11:59 PM)

    for (let time = startTime; time < endTime; time += 15) {
      const startFormatted = formatTime(time);
      const endFormatted = formatTime(time + 15); // 15 minutes later
      timeSlots.push(`${startFormatted} - ${endFormatted}`);
    }

    return timeSlots;
  };

  const availableTimeSlots = selectedDate
    ? generateTimeSlots(selectedDate)
    : [];

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight">
          Delivery options
        </CardTitle>
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
              className={`h-6 w-6 border-2 border-gray-400 hover:border-black ${
                selectedOption === "standard" ? "border-4 border-black" : ""
              }`}
              checked={selectedOption === "standard"}
            />
            <span className="font-medium">Standard</span>
            <span className="text-gray-500">50 - 65 mins</span>
          </Label>

          <Label
            htmlFor="priority"
            className="flex flex-col rounded-lg border border-gray-300 hover:bg-gray-100 cursor-pointer transition"
          >
            <div className="flex items-center space-x-2 p-2">
              <RadioGroupItem
                value="priority"
                id="priority"
                className={`h-6 w-6 border-2 border-gray-400 hover:border-black ${
                  selectedOption === "priority" ? "border-4 border-black" : ""
                }`}
                checked={selectedOption === "priority"}
              />
              <span className="font-medium">Priority</span>
              <span className="text-gray-500">45 - 55 mins</span>
              <div className="text-orange-500 font-semibold">+ $19.00</div>
            </div>
            {selectedOption === "priority" && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="" variant="outline">
                    What is priority delivery
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      What is priority delivery?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      With Priority Delivery, the delivery man heads directly to
                      you - no extra stops. Get a $19 voucher if your order is
                      late.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </Label>

          <Label
            htmlFor="scheduled"
            className="flex items-center space-x-2 p-2 rounded-lg border border-gray-300 hover:bg-gray-100 cursor-pointer transition"
          >
            <RadioGroupItem
              value="scheduled"
              id="scheduled"
              className={`h-6 w-6 border-2 border-gray-400 hover:border-black ${
                selectedOption === "scheduled" ? "border-4 border-black" : ""
              }`}
              checked={selectedOption === "scheduled"}
            />
            <span className="font-medium">Scheduled</span>
            {selectedTime && selectedDate ? (
              <>
                <span className="">
                  {formatDateAndtime(selectedDate, selectedTime)}
                </span>
                <button
                  className="ml-2 p-1 text-blue-500 underline"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Edit
                </button>
              </>
            ) : (
              <span className="text-gray-500">Select a date and time</span>
            )}
          </Label>
        </RadioGroup>
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <button className="hidden">Open Dialog</button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Select a date and time</DialogTitle>
            <DialogDescription></DialogDescription>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={isDateDisabled}
              initialFocus
              className="h-full w-full flex "
              classNames={{
                months:
                  "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                month: "space-y-4 w-full flex flex-col",
                table: "w-full h-full border-collapse space-y-1",
                head_row: "",
                row: "w-full m-2",
              }}
            />

            {selectedDate && (
              <div className="mt-4">
                <h3 className="text-lg">Select a time:</h3>
                <select
                  className="mt-2 p-2 border border-gray-300 cursor-pointer"
                  value={selectedTime || ""}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="" disabled>
                    Select a time
                  </option>
                  {availableTimeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              className="mt-4 p-2 bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
              disabled={!selectedDate || !selectedTime}
              onClick={() => {
                console.log(`Date: ${selectedDate}, Time: ${selectedTime}`);
                setIsDialogOpen(false);
              }}
            >
              Confirm
            </button>
          </DialogContent>
        </Dialog>
      </CardContent>
    </>
  );
};

export default DeliveryOptions;
