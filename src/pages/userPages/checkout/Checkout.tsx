import { TfiMoney } from "react-icons/tfi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import stripeLogo from "../../../assets/icons/stripe-logo.png";
import paypalLogo from "../../../assets/images/paypal.png";

import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetASingleBookingQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookings.api";

import moment from "moment";
import { TSlot } from "@/types/slot.types";
import { Col, Divider, Modal, Rate, Row, Skeleton, Spin } from "antd";

import { TRoom } from "@/types/room.types";
import { CiCalendar, CiViewTimeline } from "react-icons/ci";
import { GoClock } from "react-icons/go";

import StripePayment from "./StripePayment";
import PayPalPayment from "./PayPalPayment";
import { IoCheckmark, IoChevronBackOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { TReduxResponse } from "@/types";
import { TBooking } from "@/types/booking.types";

export default function Checkout() {
  const { id } = useParams();

  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const { data, isLoading } = useGetASingleBookingQuery(id as string);
  const [updateBooking, { isLoading: updateLoading }] =
    useUpdateBookingMutation();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<any>();

  const handleConfirmBooking = async () => {
    if(!paymentSuccess){
      return
    }
    const updatedBooking: TBooking = {
      ...bookingDetails,
      isConfirmed: "confirmed",
      paymentMethod,
    };

    try {
      const result = (await updateBooking({
        id: bookingDetails._id,
        booking: updatedBooking,
      })) as TReduxResponse<any>;

      if (result.error) {
        console.log(result.error);
        toast.error(result.error?.message || result.error?.data?.message);
      } else if (result.data) {
        toast.success(
          result.data?.message || result.data?.data?.message || result?.message
        );
        setBookingSuccess(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to confirm booking...");
    }
  };

  const bookingSummary = bookingDetails && (
    <div className="flex font-semibold flex-col gap-2 text-sm">
      <Link to={`/rooms/${bookingDetails?.room?._id}`} className="flex gap-2">
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
      </Link>

      <Divider className="bg-slate-200 my-2"></Divider>

      <div className="flex justify-between">
        <span className="flex gap-2 items-center">
          <TfiMoney className="text-xl"></TfiMoney>
          Price Per Slot
        </span>
        <span className="text-slate-500 ">
          $ {bookingDetails?.room.pricePerSlot}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="flex gap-2 items-center">
          <CiViewTimeline className="text-xl"></CiViewTimeline>
          Total Slots
        </span>
        <span className="text-slate-500 ">{bookingDetails.slots?.length}</span>
      </div>
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
          <TfiMoney className="text-xl"></TfiMoney>
          Total Price
        </span>
        <span className="text-slate-500 ">
          $ {Number(bookingDetails?.totalAmount).toFixed(2)}
        </span>
      </div>

      <Spin spinning={updateLoading} fullscreen></Spin>
      <Divider className="bg-slate-200 my-2"></Divider>

      <div className="flex flex-col gap-2">
        <span>Slot Details</span>
        <div className="col-span-2">
          {bookingDetails?.slots?.length > 0 &&
            bookingDetails.slots.map((item: TSlot, index: number) => (
              <div
                className={`${
                  index !== 1 &&
                  bookingDetails?.slots?.length > 1 &&
                  "border-b-[1px]"
                } hover:text-slate-500  text-slate-500 hover:bg-slate-100 flex items-start gap-2 justify-center py-4`}
              >
                <GoClock className="text-xl"></GoClock>
                <span className="flex  whitespace-nowrap gap-2">
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
    setBookingDetails(data?.data);
  }, [data]);

  return (
    <section className="bg-white">
      <Breadcrumb className="px-8 md:py-6 py-2">
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
        {/* payment details */}
        <Card className="md:col-span-3 col-span-1 shadow-none rounded-sm">
          <div className="flex items-start pt-6">
            <Link
              to="/user/my-bookings"
              className="text-xl text-slate-500 ml-4"
            >
              <IoChevronBackOutline></IoChevronBackOutline>
            </Link>
            <CardHeader className="pl-2 pt-0">
              <CardTitle className="text-xl font-bold">
                Payment Details
              </CardTitle>
              <CardDescription>
                Choose a payment method to confirm your booking
              </CardDescription>
            </CardHeader>
          </div>

          <CardContent>
            {/* user details */}
            {bookingDetails && (
              <>
                <div className="gap-4 mb-8 flex flex-col">
                  <Row gutter={12}>
                    <Col
                      className="w-full mb-2"
                      lg={{ span: 12 }}
                      sm={{ span: 24 }}
                    >
                      <label className="text-slate-800 font-medium">Name</label>
                      <p className="border-[1px] rounded-sm mt-2 p-2 border-slate-300 text-slate-600">
                        {bookingDetails?.user?.name}
                      </p>
                    </Col>
                    <Col className="w-full" lg={{ span: 12 }} sm={{ span: 24 }}>
                      <label className="text-slate-800 font-medium">
                        Email
                      </label>
                      <p className="border-[1px] rounded-sm mt-2 p-2 border-slate-300 text-slate-600">
                        {bookingDetails?.user?.email}
                      </p>
                    </Col>
                  </Row>
                  <Row gutter={12}>
                    <Col className="w-full" lg={{ span: 12 }} sm={{ span: 24 }}>
                      <label className="text-slate-800 font-medium">
                        Address
                      </label>
                      <p className="border-[1px] rounded-sm my-2 p-2 border-slate-300 text-slate-600">
                        {bookingDetails?.user?.address}
                      </p>
                    </Col>
                    <Col className="w-full" lg={{ span: 12 }} sm={{ span: 24 }}>
                      <label className="text-slate-800 font-medium">
                        Phone
                      </label>
                      <p className="border-[1px] rounded-sm mt-2 p-2 border-slate-300 text-slate-600">
                        {bookingDetails?.user?.phone}
                      </p>
                    </Col>
                  </Row>
                </div>

                {/* payment details */}
                <Tabs
                  onValueChange={(value: string) => setPaymentMethod(value)}
                  defaultValue={paymentMethod}
                  className="w-full"
                >
                  <TabsList className="md:p-0 gap-4 w-full grid bg-transparent grid-cols-2 h-fit">
                    <TabsTrigger
                      disabled={isProcessing && paymentMethod === "stripe"}
                      value="stripe"
                      className="data-[state=active]:shadow-none data-[state=active]:border-primaryColor border-slate-300 border-[1px]"
                    >
                      <div className="px-4 h-full">
                        <img src={stripeLogo} className="md:w-40 "></img>
                      </div>
                    </TabsTrigger>

                    <TabsTrigger
                      disabled={isProcessing && paymentMethod === "paypal"}
                      value="paypal"
                      className="data-[state=active]:shadow-none data-[state=active]:border-primaryColor border-slate-300 border-[1px] md:max-h-20 max-h-10"
                    >
                      <div className="">
                        <img
                          src={paypalLogo}
                          className="object-contain h-full"
                        ></img>
                      </div>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="stripe">
                    <StripePayment
                      handleConfirmBooking={handleConfirmBooking}
                      totalAmount={bookingDetails.totalAmount as number}
                      isProcessing={isProcessing}
                      setPaymentSuccess={setPaymentSuccess}
                      setIsProcessing={setIsProcessing}
                    ></StripePayment>
                  </TabsContent>
                  <TabsContent value="paypal">
                    <PayPalPayment
                      bookingId={bookingDetails._id as string}
                      totalAmount={bookingDetails.totalAmount as number}
                      handleConfirmBooking={handleConfirmBooking}
                      setPaymentSuccess={setPaymentSuccess}
                      setIsProcessing={setIsProcessing}
                    ></PayPalPayment>
                  </TabsContent>
                </Tabs>
              </>
            )}
            {isLoading && <Skeleton paragraph={{ rows: 4 }} active></Skeleton>}
          </CardContent>
        </Card>

        <div className="md:col-span-2 col-span-1 flex flex-col gap-4">
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


      {bookingDetails && (
        <Modal
          onCancel={() => {
            navigate("/user/my-bookings");
          }}
          footer={null}
          open={bookingSuccess}
        >
          <div className="flex justify-center flex-col items-center text-center">
            <div className="p-4 rounded-full w-fit text-green-700 text-4xl bg-green-300">
              <IoCheckmark></IoCheckmark>
            </div>
            <h1 className="font-extrabold text-4xl mt-4">Booking Confirmed</h1>
            <h1 className="font-medium text-xl text-slate-500">
              Thank you for booking!
            </h1>

            <div>
              <div className="flex flex-wrap gap-4 my-4 py-4 border-y-[1px] justify-between md:items-start">
                <div className="flex text-left gap-2">
                  <img
                    src={bookingDetails?.room?.roomImages[0]}
                    className="w-24 rounded-sm"
                  />
                  <div className="">
                    <p className="text-slate-500 text-xs">
                      Room No. {(bookingDetails?.room as TRoom)?.roomNo}
                    </p>
                    <p className="text-lg">
                      {(bookingDetails?.room as TRoom)?.name}
                    </p>
                    <span className="text-slate-500 flex items-center">
                      <Rate className="scale-75" count={1} value={1}></Rate>{" "}
                      {(bookingDetails?.room as TRoom)?.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex text-right gap-2 items-center whitespace-nowrap font-medium">
                    <GoClock className="text-xl"></GoClock>
                    <span>Booked Time Slots</span>
                  </div>
                  {bookingDetails?.slots?.length > 0 &&
                    bookingDetails.slots.map((item: TSlot) => (
                      <div className="text-slate-400 text-sm">
                        {moment(item?.startTime, "HH:mm").format("hh:mm A")} -{" "}
                        {moment(item?.endTime, "HH:mm").format("hh:mm A")}
                      </div>
                    ))}
                </div>
              </div>

              <p>
                You paid
                <span className="font-bold ml-[4px]">
                  ${bookingDetails.totalAmount}
                </span>
                . A receipt copy was sent to
                <span className="font-bold mx-[4px]">
                  {" "}
                  {bookingDetails.user.email}
                </span>
              </p>
            </div>

            <Link to="/user/my-bookings">
              <Button variant="link" className="text-primaryColor underline">
                See My Bookings
              </Button>
            </Link>
          </div>
        </Modal>
      )}
    </section>
  );
}
