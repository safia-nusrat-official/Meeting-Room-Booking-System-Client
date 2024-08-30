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
import { Pagination, Table, Tag } from "antd";
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
} from "@/redux/api/bookings.api";
import { TSlot } from "@/types/slot.types";


const MyBookings = () => {
  const [current, setCurrent] = useState(1);

  const { data, isLoading, isFetching } = useGetMyBookingsQuery(null);

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
            console.log(res.data);
            toast.success("booking Deleted Successfully!");
          } else {
            console.log(res.error?.message || res.error?.data?.message);
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
      render: (item: TRoom) => {
        return (
          <Link to={`/rooms/${item?._id}`}>
            <Button variant={"link"}>{item?.name}</Button>
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
        console.log(slots);
        return (
          <div>
            {slots.map((slot) => (
              <Link to={`/slots-list`}>
                {slot.startTime} - {slot.endTime}
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
      render: (price: string) => <p>$ {price}</p>,
    },
    {
      title: "Status",
      dataIndex: "isConfirmed",
      key: "isConfirmed",
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
            <Link to={`/user/checkout/${item._id as string}`} className="hidden md:flex gap-2">
              {/* <UpdateBooking id={item._id as string}></UpdateBooking> */}
              <Button
                variant={"secondary"}
                className="border-[1px]"
              >
                Proceed To Payment
              </Button>
            </Link>
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
                      onClick={() => handleDelete(item._id as string)}
                      variant={"destructive"}
                    >
                      Delete
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
      <div className="flex md:p-0 px-4 pb-0 pt-6 w-full items-center justify-between">
        <SectionHeading mode="dark">All bookings</SectionHeading>
        <Link to="/admin/create-booking">
          <Button>Create a booking</Button>
        </Link>
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

}

export default MyBookings

