import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { TMeta, TReduxResponse } from "@/types";
import { TBooking, TBookingStatus } from "@/types/booking.types";
import { Pagination, Table, Tag } from "antd";
import confirm from "antd/es/modal/confirm";
import { CiCircleAlert } from "react-icons/ci";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { TRoom } from "@/types/room.types";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import {
  useGetMyBookingsQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookings.api";
import { TSlot } from "@/types/slot.types";
import { useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/features/authSlice";
import { TUser } from "@/types/user.types";

const MyBookings = () => {
  const [current, setCurrent] = useState(1);
  const user = useAppSelector(getUser) as TUser;
  const { data, isLoading, refetch, isFetching } = useGetMyBookingsQuery(
    user.email
  );

  const [updateBookingStatus] = useUpdateBookingMutation();
  const bookingData: TBooking[] =
    data && data?.data.map((booking: TBooking) => ({ ...booking }));

  console.log(bookingData);
  const meta: TMeta = data && data?.meta;

  const handleStatusUpdate = async (id: string) => {
    confirm({
      title: "Are you sure you want to cancel this booking?",
      icon: <CiCircleAlert className="text-4xl mr-2" />,
      content: `Cancelled bookings will be deleted. Click Yes to proceed.`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      okCancel: true,
      async onOk() {
        try {
          const res = (await updateBookingStatus({
            id,
            booking: {
              isConfirmed: "canceled",
            },
          })) as TReduxResponse<any>;

          if (res.data?.data) {
            console.log(res.data);
            toast.success("Booking cancled Successfully!");
            refetch();
          } else {
            console.log(res.error?.message || res.error?.data?.message);
            toast.error(
              res.error?.message ||
                res.error?.data?.message ||
                "Booking Cancellation Failed."
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
      onCancel() {},
    });
  };

  const columns: ColumnsType<TBooking> = [
    {
      title: "Room",
      dataIndex: "room",
      render: (room: TRoom) => {
        return (
          <Link to={`/rooms/${room?._id}`} className="flex flex-col gap-2">
            <img src={room?.roomImages[0]} className="w-24 rounded-sm" />
            <div className="">
              <p className="text-slate-500 whitespace-nowrap text-xs">
                Room No. {room.roomNo}
              </p>
              <p className="font-semibold">{room.name}</p>
              <p className="text-slate-500 whitespace-nowrap text-xs">
                $ {room.pricePerSlot} per slot
              </p>
            </div>
          </Link>
        );
      },
      responsive: ["md"],
    },
    {
      className: "md:hidden table-cell",
      title: "Room & Amount",
      render: (booking: any) => {
        return (
          <div className="font-medium flex flex-col">
            <img src={booking?.room?.roomImages[0]} className="w-full mb-2 rounded-sm" />

            <p className="text-slate-500 text-xs">
              Room No. {booking.room?.roomNo}
            </p>
            <p className="text-sm">{booking.room?.name}</p>
          </div>
        );
      },
    },
    {
      title: "Booking Details",
      render: (booking: TBooking) => {
        return (
          <div className="flex text-xs flex-col gap-4 text-slate-500">
            <p className="whitespace-nowrap ">
              Total Price:
              <span className="text-zinc-800 ml-[2px] font-semibold">
                $ {booking.totalAmount}
              </span>
            </p>
            <p className="">
              Booked Date: <br />
              <span className="ml-[2px] text-zinc-800 font-semibold">
                {moment(booking.date).format("Do MMM YYYY")}
              </span>
            </p>
          </div>
        );
      },
    },
    
    {
      title: "Booked Slots",
      dataIndex: "slots",
      className: "",
      key: "slots",
      render: (slots: TSlot[]) => {
        return (
          <div className="flex flex-col gap-4">
            {slots.map((slot) => (
              <div className="font-medium border-[1px] bg-slate-100 p-2 rounded-sm whitespace-nowrap text-primaryColor flex flex-col">
                <span>{moment(slot.startTime, "HH:mm").format("hh:mm a")}</span>
                <span>{moment(slot.endTime, "HH:mm").format("hh:mm a")}</span>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: "Payment Details",
      render: (booking: TBooking) => {
        return booking.paymentDate ? (
          <div className="flex text-center text-zinc-500 flex-col gap-2">
            <p className="text-xs whitespace-nowrap mt-4">
              Payment Method: <br />
              <Tag
                className="font-medium mt-[2px]"
                color={booking.paymentMethod === "stripe" ? "purple" : "blue"}
              >
                {booking.paymentMethod}
              </Tag>
            </p>

            <p className="text-xs mt-4">
              Payment Date: <br />
              <span className="ml-[2px] text-zinc-800 font-semibold">
                {moment(booking.paymentDate).format("DD MMM YYYY")}
              </span>
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <Tag
              className="w-full text-center md:hidden block font-medium"
              color={
                booking.isConfirmed === "confirmed"
                  ? "blue"
                  : booking.isConfirmed === "canceled"
                  ? "red"
                  : "orange"
              }
            >{`${booking.isConfirmed}`}</Tag>
            <Tag className="font-medium">Not Yet Paid</Tag>
          </div>
        );
      },
    },
    {
      title: "Status",
      className: "md:table-cell hidden",
      dataIndex: "isConfirmed",
      key: "_id",
      render: (item: TBookingStatus) => {
        return (
          <Tag
            className="font-medium"
            color={
              item === "confirmed"
                ? "green"
                : item === "canceled"
                ? "red"
                : "orange"
            }
          >{`${item}`}</Tag>
        );
      },
    },
    {
      title: "Actions",
      render: (item: TBooking) => {
        return (
          <>
            <div className="md:table-cell hidden gap-2">
              <Button
                disabled={item.isConfirmed === "confirmed"}
                variant="destructive"
                onClick={() => handleStatusUpdate(item._id as string)}
                className="border-[1px] w-full"
              >
                Cancel Booking
              </Button>
              <Link
                to={
                  item.isConfirmed !== "confirmed"
                    ? `/user/checkout/${item._id as string}`
                    : ""
                }
                className="w-full gap-2"
              >
                <Button
                  disabled={item.isConfirmed === "confirmed"}
                  variant={"secondary"}
                  className="border-[1px] w-full mt-4"
                >
                  Proceed To Payment
                </Button>
              </Link>
            </div>
            <div className="table-cell md:hidden">
              <Button
                disabled={item.isConfirmed === "confirmed"}
                variant="destructive"
                onClick={() => handleStatusUpdate(item._id as string)}
                className="border-[1px] mt-2 w-full"
                size={"sm"}
              >
                Cancel
              </Button>
              <Link
                to={
                  item.isConfirmed !== "confirmed"
                    ? `/user/checkout/${item._id as string}`
                    : ""
                }
                className="w-full gap-2"
              >
                <Button
                  disabled={item.isConfirmed === "confirmed"}
                  variant={"default"}
                  size={"sm"}
                  className="border-[1px] w-full mt-2 whitespace-break-spaces"
                >
                  Pay
                </Button>
              </Link>
            </div>
          </>
        );
      },
    },
  ];
  return (
    <div className="">
      <div className="md:p-8 px-4 pb-0 pt-6 w-full">
        <SectionHeading mode="dark">My bookings</SectionHeading>
        <p className="mt-6 text-slate-500">
          Proceed to payment to confirm your booking status
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <Table
          size="small"
          className="md:hidden block"
          style={{
            padding: "4px",
          }}
          scroll={{ x: true }}
          bordered
          loading={isLoading || isFetching}
          dataSource={bookingData}
          columns={columns}
          pagination={false}
        />
        <Table
          className="hidden md:block"
          loading={isLoading || isFetching}
          dataSource={bookingData}
          columns={columns}
          pagination={false}
        />
        <Pagination
          className="mx-auto my-6"
          total={meta?.totalDocuments}
          pageSize={meta?.limit}
          current={current}
          onChange={(value) => setCurrent(value)}
        ></Pagination>
      </div>
    </div>
  );
};

export default MyBookings;
