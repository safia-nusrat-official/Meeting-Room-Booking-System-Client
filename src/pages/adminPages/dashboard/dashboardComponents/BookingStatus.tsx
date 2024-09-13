import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";
import moment from "moment";
import { useGetAllBookingsQuery } from "@/redux/api/bookings.api";
import { useEffect, useState } from "react";
import { TBooking } from "@/types/booking.types";

const orders = [
  { id: "1005", payment: "Paid", fulfillment: "Delivering", amount: "$154.60" },
  { id: "1004", payment: "Paid", fulfillment: "Unfulfilled", amount: "$93.49" },
  {
    id: "1003",
    payment: "Refunded",
    fulfillment: "Cancelled",
    amount: "$39.00",
  },
  {
    id: "1002",
    payment: "Unpaid",
    fulfillment: "Unfulfilled",
    amount: "$438.90",
  },
];

const getBadgeColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
      return;
    case "refunded":
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    case "unpaid":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "delivering":
      return "";
    case "unfulfilled":
      return "";
    case "cancelled":
      return "";
    default:
      return;
  }
};

export default function BookingStatus() {
  const { data, isLoading } = useGetAllBookingsQuery([{key:"limit", value:"7"}]);
  const [bookings, setBookings] = useState<TBooking[]>([]);

  useEffect(() => {
    data && setBookings(data.data);
  }, [data]);

  return (
    <Card className="w-full col-span-4 md:max-w-3xl bg-white shadow-none rounded-sm border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-gray-800">
          Bookings
        </CardTitle>
        <div className="flex items-center text-sm text-gray-600">
          <CalendarIcon className="mr-1 h-4 w-4" />
          {moment().format("MMMM YYYY")}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="text-left font-medium text-gray-600">
                Booking no.
              </TableHead>
              <TableHead className="text-left font-medium text-gray-600">
                Status
              </TableHead>
              <TableHead className="text-right font-medium text-gray-600">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking: TBooking) => (
              <TableRow
                key={booking._id}
                className="bbooking-b bbooking-gray-100"
              >
                <TableCell className="font-medium text-xs text-gray-900">
                  {booking.bookingId}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      booking.isConfirmed === "confirmed"
                        ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                        : booking.isConfirmed === "unconfirmed"
                        ? "bg-orange-100 text-orange-800 hover:bg-orange-200"
                        : "bg-red-100 text-red-800 hover:bg-red-200"
                    } text-xs font-medium cursor-pointer`}
                  >
                    {booking.isConfirmed}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium text-gray-900">
                  $ {booking.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
