import { useState } from "react";
import { CalendarIcon, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useParams } from "react-router-dom";
import { useGetASingleBookingQuery } from "@/redux/api/bookings.api";
import { TBooking } from "@/types/booking.types";
import moment from "moment";
import { TSlot } from "@/types/slot.types";

export default function Checkout() {
  const { id } = useParams();
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const { data, isLoading } = useGetASingleBookingQuery(id as string);

  const bookingDetails = data && data.data;

  const handleConfirmBooking = () => {
    setIsConfirmationOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Payment Page</CardTitle>
          <CardDescription>
            Complete your booking by selecting a payment method
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Booking Summary</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Room:</div>
              <div>{bookingDetails.room?.name}</div>
              <div>Date:</div>
              <div>{bookingDetails?.date}</div>
              <div>Slots:</div>
              <div className="col-span-2">
                {bookingDetails?.slots?.length > 0 &&
                  bookingDetails.slots.map((item: TSlot) => (
                    <span className="">
                      {moment(item?.startTime, "HH:mm").format("hh:mm A")}
                      <br></br>{" "}
                      {moment(item?.endTime, "HH:mm").format("hh:mm A")}
                    </span>
                  ))}
              </div>
              <div>Cost:</div>
              <div>{bookingDetails.cost}</div>
              <div>Name:</div>
              <div>{bookingDetails.userName}</div>
              <div>Email:</div>
              <div>{bookingDetails.userEmail}</div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Method</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <label htmlFor="paypal">PayPal</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="stripe" id="stripe" />
                <label htmlFor="stripe">Stripe</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="amarpay" id="amarpay" />
                <label htmlFor="amarpay">AmarPay</label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleConfirmBooking} className="w-full">
            Confirm Booking
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Confirmed</DialogTitle>
            <DialogDescription>Thank you for your booking!</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <h4 className="font-semibold">Booking Details:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Room:</div>
              <div>{bookingDetails.roomName}</div>
              <div>Date:</div>
              <div>{bookingDetails.date}</div>
              <div>Time:</div>
              <div>{bookingDetails.time}</div>
              <div>Cost:</div>
              <div>{bookingDetails.cost}</div>
              <div>Payment Method:</div>
              <div className="capitalize">{paymentMethod}</div>
            </div>
            <p className="text-center text-muted-foreground">
              A confirmation email has been sent to {bookingDetails.userEmail}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
