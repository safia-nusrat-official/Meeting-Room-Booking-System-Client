import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { TMeta, TReduxResponse } from "@/types";
import { TBooking, TBookingStatus } from "@/types/booking.types";
import { Pagination, Rate, Table, Tag } from "antd";
import confirm from "antd/es/modal/confirm";
import { CiCircleAlert } from "react-icons/ci";
import { PiTrashLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { TRoom } from "@/types/room.types";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import {
  useDeleteBookingMutation,
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
      key: "roomName",
      render: (room: TRoom) => {
        return (
          <Link to={`/rooms/${room?._id}`} className="flex gap-2">
            <img src={room?.roomImages[0]} className="w-24 rounded-sm" />
            <div className="font-medium">
              <p className="text-slate-500 text-xs">Room No. {room.roomNo}</p>
              <p className="text-lg">{room.name}</p>
              <span className="text-slate-500 flex items-center">
                <Rate className="scale-75" count={1} value={1}></Rate>{" "}
                {room.rating}
              </span>
            </div>
          </Link>
        );
      },
      responsive: ["md"],
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (item: string) => {
        return `${moment(item).format("DD/MM/YY")}`;
      },
    },
    {
      title: "Booked Slots",
      dataIndex: "slots",
      key: "slots",
      render: (slots: TSlot[]) => {
        return (
          <div className="flex flex-col gap-4">
            {slots.map((slot) => (
              <Link
                to={`/slots-list`}
                className="font-medium border-[1px] bg-slate-100 p-2 rounded-sm whitespace-nowrap text-primaryColor flex flex-col"
              >
                <span>{moment(slot.startTime, "HH:mm").format("hh:mm a")}</span>
                <span>{moment(slot.endTime, "HH:mm").format("hh:mm a")}</span>
              </Link>
            ))}
          </div>
        );
      },
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (price: string) => (
        <p className="text-slate-500 font-medium">$ {price}</p>
      ),
    },
    {
      title: "Status",
      dataIndex: "isConfirmed",
      key: "_id",
      render: (item: TBookingStatus) => {
        return (
          <Tag
            color={
              item === "confirmed"
                ? "blue"
                : item === "canceled"
                ? "red"
                : "yellow"
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
            <div className="flex flex-col gap-2">
              <Button
                disabled={item.isConfirmed === "confirmed"}
                variant="destructive"
                onClick={() => handleStatusUpdate(item._id as string)}
                className="border-[1px]"
              >
                Cancel Booking
              </Button>
              <Link
                to={
                  item.isConfirmed === "confirmed" ?
                  `/user/checkout/${item._id as string}`:""
                }
                className="hidden md:flex gap-2"
              >
                <Button disabled={item.isConfirmed === "confirmed"} variant={"secondary"} className="border-[1px]">
                  Proceed To Payment
                </Button>
              </Link>
            </div>
            <div className="md:hidden block">
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none h-12 px-2 hover:bg-slate-50 items-center flex gap-2">
                  <Button variant="ghost">...</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="font-medium">
                  <DropdownMenuItem>
                    {/* <UpdateBooking id={item._id as string}></UpdateBooking> */}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      onClick={() => handleStatusUpdate(item._id as string)}
                      variant={"destructive"}
                    >
                      Cancel Booking
                      <PiTrashLight className="text-lg ml-2"></PiTrashLight>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        );
      },
    },
  ];
  return (
    <div className="md:p-8">
      <div className="md:p-0 px-4 pb-0 pt-6 w-full">
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
