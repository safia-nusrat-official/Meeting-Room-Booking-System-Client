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
import SearchBar from "@/components/shared/SearchBar";
import { IoAddCircle } from "react-icons/io5";

const SlotListTable = () => {
  const [current, setCurrent] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isFetching } = useGetAllSlotsQuery([
    { key: "limit", value: "7" },
    { key: "page", value: `${current}` },
    { key: "searchTerm", value: `${searchTerm}` },
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
            toast.success("Slot Deleted Successfully!");
          } else {
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
      key: "room",
      dataIndex: "room",
      render: (room: TRoom) => {
        return (
          <Link to={`/rooms/${room?._id}`} className="flex flex-wrap gap-2">
            <p className="text-slate-500 text-xs">
              Room No. {(room as TRoom)?.roomNo},
            </p>
            <p className="md:text-lg text-sm font-medium">
              {(room as TRoom)?.name}
            </p>

            <p className="text-slate-500 md:block hidden font-medium">
              $ {(room as TRoom)?.pricePerSlot} per slot
            </p>
            <p className="text-slate-500 md:hidden block font-medium">
              $ {(room as TRoom)?.pricePerSlot}{" "}
              <span className="text-xs">/ slot</span>
            </p>
          </Link>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (item: string) => {
        return (
          <p className="whitespace-nowrap font-medium">
            {moment(item).format("MMM D YYYY")}
          </p>
        );
      },
      className: "md:table-cell hidden",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (startTime) => (
        <p className="whitespace-nowrap">
          {moment(startTime, "HH:mm").format("hh:MM a")}
        </p>
      ),
      className: "md:table-cell hidden",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (endTime) => (
        <p className="whitespace-nowrap">
          {moment(endTime, "HH:mm").format("hh:MM a")}
        </p>
      ),
      className: "md:table-cell hidden",
    },
    {
      title: "Date & Time",
      render: (slot) => (
        <div className="text-xs text-slate-500">
          <p className="whitespace-nowrap text-sm mb-2 font-medium">
            {moment(slot.date).format("MMM D YYYY")}
          </p>
          From{" "}
          <p className="whitespace-nowrap text-sm font-medium text-slate-900 mb-2">
            {moment(slot.startTime, "HH:mm").format("hh:MM a")}
          </p>{" "}
          To
          <p className="whitespace-nowrap text-sm font-medium text-slate-900 ">
            {moment(slot.endTime, "HH:mm").format("hh:MM a")}
          </p>
        </div>
      ),
      className: "table-cell md:hidden",
    },
    {
      title: "Booked Status",
      dataIndex: "isBooked",
      key: "isBooked",
      className: "md:table-cell hidden",
      render: (item) => {
        return (
          <Tag color={item ? "blue" : "red"}>
            {item ? "Booked" : "Not Booked"}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      render: (item: TSlot) => {
        return (
          <>
            <div className="flex justify-end flex-wrap gap-2">
              <Tag
                className="md:hidden table-cell"
                color={
                  item.isDeleted ? "default" : item.isBooked ? "blue" : "red"
                }
              >
                {item.isBooked ? "Booked" : "Not Booked"}
              </Tag>
              <UpdateSlot 
                disabled={item.isDeleted||item.isBooked} id={item._id as string}></UpdateSlot>
              <Button
                disabled={item.isDeleted||item.isBooked}
                onClick={() => handleDelete(item._id as string)}
                variant={"destructive"}
                className="w-full"
              >
                {!item.isDeleted ? "Delete" : "Deleted"}
                <PiTrashLight className="text-lg ml-2"></PiTrashLight>
              </Button>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div className="">
      <div className="flex md:p-8 px-4 pb-0 pt-6 w-full items-center justify-between">
        <SectionHeading mode="dark">All Slots</SectionHeading>
        <Link to="/admin/create-slot">
          <Button className="md:block hidden">Create a Slot</Button>
          <IoAddCircle className="block text-primaryColor md:hidden text-4xl"></IoAddCircle>
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <div className="md:mx-8 mx-4">
          <SearchBar setSearchTerm={setSearchTerm}></SearchBar>
        </div>
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
