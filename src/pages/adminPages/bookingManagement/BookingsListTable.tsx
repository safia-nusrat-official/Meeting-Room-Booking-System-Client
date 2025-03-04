import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { TMeta, TReduxResponse } from "@/types";
import { TBooking, TBookingStatus } from "@/types/booking.types";
import { ConfigProvider, Pagination, Table, Tag } from "antd";
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
  useGetAllBookingsQuery,
} from "@/redux/api/bookings.api";
import { TUser } from "@/types/user.types";
import { TSlot } from "@/types/slot.types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

const BookingListsTable = () => {
  const [current, setCurrent] = useState(1);
  const { data, isLoading, isFetching } = useGetAllBookingsQuery([
    { key: "limit", value: "7" },
    { key: "page", value: `${current}` },
    { key: "isDeleted", value: `true` },
    { key: "isDeleted", value: `false` },
  ]);
  const [deletebooking] = useDeleteBookingMutation();
  const bookingData: TBooking[] =
    data && data?.data.map((booking: TBooking) => ({ ...booking }));

  const meta: TMeta = data && data?.meta;

  const handleDelete = async (id: string) => {
    confirm({
      title: "Are you sure delete this booking?",
      icon: <CiCircleAlert className="text-4xl mr-2" />,
      content: `booking for will be removed from the database permanently.`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      okCancel: true,
      async onOk() {
        try {
          const res = (await deletebooking(id)) as TReduxResponse<any>;
          if (res.data) {
            toast.success("booking Deleted Successfully!");
          } else {
            toast.error(res.error?.message || "booking Delete Failed.");
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
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (item: TUser) => (
        <Link className="flex flex-col break-words" to="/admin/all-users">
          <Avatar>
            <AvatarImage src={item?.profileImage}></AvatarImage>
            <AvatarFallback>
              {item.name[0]}
              {item.name.split(" ").length > 1 && item.name.split(" ")[1][0]}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{item?.name}</span>
          <span className="text-xs text-zinc-500 text-ellipsis overflow-hidden truncate max-w-28">
            {item?.email}
          </span>
        </Link>
      ),
    },
    {
      title: "Booking Details",
      sorter: (a, b) => (b.totalAmount as number) - (a.totalAmount as number),
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
      key: "slots",
      render: (slots: TSlot[]) => {
        return (
          <div className="flex text-xs w-fit flex-col gap-4">
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
          <Tag className="font-medium">Not Yet Paid</Tag>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "isConfirmed",
      key: "isConfirmed",
      filters: [
        {
          text: "Confirmed",
          value: "confirmed",
        },
        {
          text: "Canceled",
          value: "canceled",
        },
        {
          text: "Unconfirmed",
          value: "unconfirmed",
        },
      ],
      onFilter: (value, item) => item.isConfirmed === value,
      render: (item: TBookingStatus) => {
        return (
          <Tag
            className="font-medium"
            color={
              item === "confirmed"
                ? "green"
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
          <div className="">
            {item.isDeleted ? (
              <Tag color="red">Deleted</Tag>
            ) : (
              <Button
                onClick={() => handleDelete(item._id as string)}
                variant={"destructive"}
                disabled={item.isConfirmed !== "canceled"}
              >
                Delete
                <PiTrashLight className="text-lg ml-2"></PiTrashLight>
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div className="">
      <div className="flex md:p-8 px-4 pb-0 pt-6 w-full items-center justify-between">
        <SectionHeading mode="dark">All bookings</SectionHeading>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <Table
          size="small"
          className="md:hidden block"
          style={{
            padding: "4px",
          }}
          scroll={{
            x: true,
          }}
          bordered
          loading={isLoading || isFetching}
          dataSource={bookingData}
          columns={columns}
          pagination={false}
        />
        <ConfigProvider
          theme={{
            components: {
              Table: {
                cellPaddingInline: 12,
              },
            },
          }}
        >
          <Table
            className="hidden md:block"
            loading={isLoading || isFetching}
            dataSource={bookingData}
            columns={columns}
            pagination={false}
          />
        </ConfigProvider>
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

export default BookingListsTable;
