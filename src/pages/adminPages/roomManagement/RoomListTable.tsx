import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  useDeleteRoomMutation,
  useGetAllAvailableRoomsQuery,
} from "@/redux/api/rooms.api";
import { TMeta, TReduxResponse } from "@/types";
import { TRoom } from "@/types/room.types";
import { Pagination, Rate, Table, TableColumnsType } from "antd";
import confirm from "antd/es/modal/confirm";
import { CiCircleAlert } from "react-icons/ci";
import { PiTrashLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import UpdateRoom from "./UpdateRoom";
import { useState } from "react";
import RoomDetailsCard from "./RoomDetailsCard";
import SearchBar from "@/components/shared/SearchBar";
import { IoMdAdd } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { roomFloorNumbersMap } from "@/pages/rooms/RoomDetails";

const RoomListTable = () => {
  const [current, setCurrent] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, isLoading, isFetching } = useGetAllAvailableRoomsQuery([
    { key: "limit", value: "5" },
    { key: "page", value: `${current}` },
    { key: "searchTerm", value: searchTerm },
  ]);
  const [deleteRoom] = useDeleteRoomMutation();
  const roomData: TRoom[] =
    !isLoading &&
    data?.data.map((room: TRoom) => ({ ...room, key: room._id as string }));

  const meta: TMeta = !isLoading && data?.meta;

  const handleDelete = async (id: string) => {
    confirm({
      title: "Are you sure delete this room?",
      icon: <CiCircleAlert className="text-4xl text-red-500 mr-2" />,
      content: `${
        roomData.filter((room) => room._id === id)[0].name
      } will be removed from the database permanently.`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        try {
          const res = (await deleteRoom(id)) as TReduxResponse<any>;
          if (res.data) {
            console.log(res.data);
            toast.success("Room Deleted Successfully!");
          } else {
            console.log(res.error?.message || res.error?.data?.message);
            toast.success(res.error?.message || "Room Created Successfully!");
          }
        } catch (error) {
          console.log(error);
        }
      },
      onCancel() {},
    });
  };

  const columns: TableColumnsType<TRoom> = [
    {
      title: "Room",
      key: "room",
      render: (room: TRoom) => {
        return (
          <Link to={`/rooms/${room?._id}`} className="flex flex-wrap gap-2">
            {/* <img
          src={room?.roomImages[0]}
          className="w-24 rounded-sm"
        /> */}
            <div className="">
              <div className="flex gap-2">
                <p className="text-slate-500 text-xs">
                  Room No. {(room as TRoom)?.roomNo},
                </p>
                <p className="text-slate-500 text-xs">
                  {(room as TRoom)?.floorNo}
                  <sup className="mr-2">
                    {room.floorNo < 4
                      ? roomFloorNumbersMap[
                          room.floorNo as keyof typeof roomFloorNumbersMap
                        ]
                      : "th"}
                  </sup>
                  Floor
                </p>
              </div>

              <p className="text-lg font-medium">{(room as TRoom)?.name}</p>

              <p className="text-slate-900 font-medium">
                $ {(room as TRoom)?.pricePerSlot} per slot
              </p>
              <div className="flex gap-2 items-center my-2 text-slate-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Upto{" "}
                <p className="text-slate-500">
                  {(room as TRoom)?.capacity}
                  {(room as TRoom)?.capacity > 1 ? " people" : " person"}
                </p>
              </div>

              <span className="text-slate-500 flex items-center">
                <Rate className="scale-75" count={1} value={1}></Rate>
                {(room as TRoom)?.rating}
              </span>
            </div>
          </Link>
        );
      },
      className: "md:hidden table-cell",
    },
    {
      title: "Room Name",
      dataIndex: "name",
      key: "name",
      className: "md:table-cell font-medium hidden",
    },
    {
      title: "Room No.",
      dataIndex: "roomNo",
      key: "roomNo",
      className: "md:table-cell hidden",
    },
    {
      title: "Floor No.",
      dataIndex: "floorNo",
      key: "floorNo",
      className: "md:table-cell hidden",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      className: "md:table-cell hidden",
    },
    {
      title: "Price Per Slot",
      dataIndex: "pricePerSlot",
      className: "md:table-cell hidden",
      key: "pricePerSlot",
      render: (price: string) => <p>$ {price}</p>,
    },
    {
      title: "Actions",
      render: (item: TRoom) => {
        return (
          <>
            <div className="flex md:flex-row flex-col gap-2">
              <RoomDetailsCard id={item._id as string}></RoomDetailsCard>
              <UpdateRoom id={item._id as string}></UpdateRoom>
              <Button
                onClick={() => handleDelete(item._id as string)}
                variant={"destructive"}
              >
                Delete
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
      <div className="flex md:p-8 p-4 items-center justify-between">
        <SectionHeading mode="dark">All Rooms</SectionHeading>
        <Link to="/admin/create-room">
          <Button className="md:block hidden">Create a Room</Button>
          <IoAddCircle className="block text-primaryColor md:hidden text-4xl"></IoAddCircle>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <div className="md:mx-8 mx-4">
          <SearchBar setSearchTerm={setSearchTerm}></SearchBar>
        </div>
        <Table
          loading={isFetching}
          dataSource={roomData}
          columns={columns}
          pagination={false}
        />
        {meta && (
          <Pagination
            className="mx-auto my-6"
            total={meta.totalDocuments}
            pageSize={meta.limit}
            current={current}
            onChange={(value) => setCurrent(value)}
          ></Pagination>
        )}
      </div>
    </div>
  );
};

export default RoomListTable;
