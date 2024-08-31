import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { TMeta, TReduxResponse } from "@/types";
import { TSlot } from "@/types/slot.types";
import { Pagination, Table, Tag } from "antd";
import confirm from "antd/es/modal/confirm";
import { CiCircleAlert } from "react-icons/ci";
import { PiTrashLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import {
  useDeleteSlotMutation,
  useGetAllSlotsQuery,
} from "@/redux/api/slots.api";
import { TRoom } from "@/types/room.types";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import UpdateSlot from "./UpdateSlot";

const SlotListTable = () => {
  const [current, setCurrent] = useState(1);
  const { data, isLoading, isFetching } = useGetAllSlotsQuery([
    { key: "limit", value: "7" },
    { key: "page", value: `${current}` },
    { key: "groupBy", value: "rooms" },
  ]);
  const [deleteSlot] = useDeleteSlotMutation();
  const slotData: TSlot[] =
    data && data?.data.map((slot: TSlot) => ({ ...slot }));

  const meta: TMeta = data && data?.meta;

  const handleDelete = async (id: string) => {
    confirm({
      title: "Are you sure delete this slot?",
      icon: <CiCircleAlert className="text-4xl mr-2" />,
      content: `Slot for ${
        slotData.filter((slot) => slot._id === id)[0].room?.name
      } will be removed from the database permanently.`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      okCancel: true,
      async onOk() {
        try {
          const res = (await deleteSlot(id)) as TReduxResponse<any>;
          if (res.data) {
            console.log(res.data);
            toast.success("Slot Deleted Successfully!");
          } else {
            console.log(res.error?.message || res.error?.data?.message);
            toast.error(res.error?.message || "Slot Delete Failed.");
          }
        } catch (error) {
          console.log(error);
        }
      },
      onCancel() {},
    });
  };

  const columns: ColumnsType<TSlot> = [
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
      title: "Room No",
      dataIndex: "room",
      key: "roomNo",
      render: (item: TRoom) => item?.roomNo,
      responsive: ["md"],
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
      render: (item: TRoom) => {
        return `${item?.name} (${item?.roomNo})`;
      },
      responsive: ["sm"],
      className: "md:hidden",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (item: string) => {
        return `${moment(item).format("DD/MM/YY")}`;
      },
    },
    // {
    //   title: "Start Time",
    //   dataIndex: "startTime",
    //   key: "startTime",
    // },
    // {
    //   title: "End Time",
    //   dataIndex: "endTime",
    //   key: "endTime",
    // },
    // {
    //   title: "Booked Status",
    //   dataIndex: "isBooked",
    //   key: "isBooked",
    //   render: (item) => {
    //     return <Tag color={item ? "blue" : "red"}>{`${item}`}</Tag>;
    //   },
    // },
    {
      title: "Slots",
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
      title: "Actions",
      render: (item: TSlot) => {
        return (
          <>
            <div className="hidden md:flex gap-2">
              <UpdateSlot id={item._id as string}></UpdateSlot>
              <Button
                onClick={() => handleDelete(item._id as string)}
                variant={"destructive"}
              >
                Delete
                <PiTrashLight className="text-lg ml-2"></PiTrashLight>
              </Button>
            </div>
            <div className="md:hidden block">
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none h-12 px-2 hover:bg-slate-50 items-center flex gap-2">
                  <Button variant="ghost">...</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="font-medium">
                  <DropdownMenuItem>
                    <UpdateSlot id={item._id as string}></UpdateSlot>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      onClick={() => handleDelete(item._id as string)}
                      variant={"destructive"}
                    >
                      Delete
                      <PiTrashLight className="text-lg ml-2"></PiTrashLight>
                    </Button>{" "}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        );
      },
    },
  ];

  console.log(slotData);

  return (
    <div className="md:p-8">
      <div className="flex md:p-0 px-4 pb-0 pt-6 w-full items-center justify-between">
        <SectionHeading mode="dark">All Slots</SectionHeading>
        <Link to="/admin/create-slot">
          <Button>Create a Slot</Button>
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
          loading={isFetching}
          dataSource={slotData}
          columns={columns}
          pagination={false}
        />
        <Table
          className="hidden md:block"
          loading={isFetching}
          dataSource={slotData}
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

export default SlotListTable;
