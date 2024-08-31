import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BiDollar } from "react-icons/bi";
import { useEffect, useState } from "react";
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

import stripeLogo from "../../../assets/icons/stripe-logo.png";
import paypalLogo from "../../../assets/icons/paypal-logo.png";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useParams } from "react-router-dom";
import {
  useGetASingleBookingQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookings.api";
import { TBooking } from "@/types/booking.types";
import moment from "moment";
import { TSlot } from "@/types/slot.types";
import { Col, Divider, Input, Rate, Row, Skeleton } from "antd";
import SectionHeading from "@/components/shared/SectionHeading";
import { TUser } from "@/types/user.types";
import { TRoom } from "@/types/room.types";
import { CiCalendar } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import { AiOutlineUser } from "react-icons/ai";
import FormInput from "@/components/shared/form/FormInput";
import StripePayment from "./StripPayment";

export default function Checkout() {
  const { id } = useParams();
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const { data, isLoading } = useGetASingleBookingQuery(id as string);
  const [updateBooking, { isLoading: updateLoading }] =
    useUpdateBookingMutation();
  const [bookingDetails, setBookingDetails] = useState<any>();

  const handleConfirmBooking = async (data: any) => {
    setIsConfirmationOpen(true);
  };

  const bookingSummary = bookingDetails && (
    <div className="flex  font-semibold flex-col gap-2 text-sm">
      <div className="flex gap-2">
        <img
          src={bookingDetails?.room?.roomImages[0]}
          className="w-24 rounded-sm"
        />
        <div className="">
          <p className="text-slate-500 text-xs">
            Room No. {(bookingDetails?.room as TRoom)?.roomNo}
          </p>
          <p className="text-lg">{(bookingDetails?.room as TRoom)?.name}</p>
          <span className="text-slate-500 flex items-center">
            <Rate className="scale-75" count={1} value={1}></Rate>{" "}
            {(bookingDetails?.room as TRoom)?.rating}
          </span>
        </div>
      </div>

      <Divider className="bg-slate-200 my-2"></Divider>

      <div className="flex justify-between">
        <span className="flex gap-2 items-center">
          <CiCalendar className="text-xl"></CiCalendar>
          Booking Date
        </span>
        <span className="text-slate-500 ">
          {moment(bookingDetails?.date, "YYYY-MM-DD").format("Do MMM YYYY")}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="flex gap-2 items-center">
          <BiDollar className="text-xl"></BiDollar>
          Total Price
        </span>
        <span className="text-slate-500 ">
          $ {Number(bookingDetails?.totalAmount).toFixed(2)}
        </span>
      </div>

      <Divider className="bg-slate-200 my-2"></Divider>

      <div className="flex flex-col gap-2">
        <span>Slot Details</span>
        <div className="col-span-2">
          {bookingDetails?.slots?.length > 0 &&
            bookingDetails.slots.map((item: TSlot, index: number) => (
              <div
                className={`${
                  index !== 1 && "border-b-[1px]"
                } hover:text-slate-500  text-slate-500 hover:bg-slate-100 flex items-center gap-2 p-4`}
              >
                <GoClock className="text-xl"></GoClock>
                <span className="flex gap-2">
                  <span>From</span>
                  <span className="text-slate-900">
                    {moment(item?.startTime, "HH:mm").format("hh:mm A")}
                  </span>
                  <span>To</span>
                  <span className="text-slate-900">
                    {moment(item?.endTime, "HH:mm").format("hh:mm A")}
                  </span>
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    console.log(data?.data);
    setBookingDetails(data?.data);
  }, [data]);

  return (
    <section className="">
      <Breadcrumb className="p-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/user/my-bookings" className="cursor-pointer">
                Bookings
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/">Checkout</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid md:px-8 p-0 gap-4 grid-cols-1 md:grid-cols-5">
        <Card className="md:col-span-3 col-span-1 shadow-none rounded-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Payment Details</CardTitle>
            <CardDescription>
              Choose a payment method to confirm your booking
            </CardDescription>
          </CardHeader>
          <CardContent>
            {bookingDetails && (
              <>
                <div className="gap-4 mb-8 flex flex-col">
                  <Row gutter={12}>
                    <Col className="" span={12}>
                      <label className="text-slate-800 font-medium">Name</label>
                      <p className="border-[1px] rounded-sm mt-2 p-2 border-slate-300 text-slate-600">
                        {bookingDetails?.user?.name}
                      </p>
                    </Col>
                    <Col className="" span={12}>
                      <label className="text-slate-800 font-medium">
                        Email
                      </label>
                      <p className="border-[1px] rounded-sm mt-2 p-2 border-slate-300 text-slate-600">
                        {bookingDetails?.user?.email}
                      </p>
                    </Col>
                  </Row>
                  <Row gutter={12}>
                    <Col className="" span={12}>
                      <label className="text-slate-800 font-medium">
                        Address
                      </label>
                      <p className="border-[1px] rounded-sm mt-2 p-2 border-slate-300 text-slate-600">
                        {bookingDetails?.user?.address}
                      </p>
                    </Col>
                    <Col className="" span={12}>
                      <label className="text-slate-800 font-medium">
                        Phone
                      </label>
                      <p className="border-[1px] rounded-sm mt-2 p-2 border-slate-300 text-slate-600">
                        {bookingDetails?.user?.phone}
                      </p>
                    </Col>
                  </Row>
                </div>

                <Tabs
                  onValueChange={(value: string) => setPaymentMethod(value)}
                  defaultValue={paymentMethod}
                  className="w-full"
                >
                  <TabsList className="md:p-0 gap-4 w-full bg-transparent justify-between h-fit">
                    <TabsTrigger
                      value="stripe"
                      className="data-[state=active]:shadow-none data-[state=active]:border-primaryColor border-slate-300 border-[1px]"
                    >
                      <div className="px-4">
                        <img src={stripeLogo} className="w-12 md:w-40"></img>
                      </div>
                    </TabsTrigger>

                    <TabsTrigger
                      value="paypal"
                      className="data-[state=active]:shadow-none data-[state=active]:border-primaryColor border-slate-300 border-[1px]"
                    >
                      <div className="px-0 md:px-16">
                        <img src={paypalLogo} className="w-8 md:w-20"></img>
                      </div>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="stripe">
                    <StripePayment
                      totalAmount={bookingDetails.totalAmount as number}
                    ></StripePayment>
                  </TabsContent>
                  <TabsContent value="paypal">
                    {paymentMethod} form here
                  </TabsContent>
                </Tabs>
              </>
            )}
            {isLoading && <Skeleton paragraph={{ rows: 4 }} active></Skeleton>}
          </CardContent>
        </Card>

        <div className="md:col-span-2 col-span-1 flex flex-col gap-4">
          {/* user details */}

          {/* booking details */}
          <Card className="shadow-none rounded-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {bookingDetails && bookingSummary}
              {isLoading && (
                <>
                  <Skeleton.Avatar
                    active
                    className="mb-4"
                    shape="square"
                    size="large"
                  ></Skeleton.Avatar>
                  <Skeleton paragraph={{ rows: 4 }} active></Skeleton>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
