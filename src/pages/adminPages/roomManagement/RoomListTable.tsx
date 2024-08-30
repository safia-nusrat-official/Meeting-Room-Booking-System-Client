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
import { Pagination, Table, TableColumnsType } from "antd";
import confirm from "antd/es/modal/confirm";
import { CiCircleAlert } from "react-icons/ci";
import { PiTrashLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import UpdateRoom from "./UpdateRoom";
import { useState } from "react";
import RoomDetailsCard from "./RoomDetailsCard";
import { TSlot } from "@/types/slot.types";

const RoomListTable = () => {
  const [current, setCurrent] = useState(1);

  const { data, isLoading, isFetching, refetch } = useGetAllAvailableRoomsQuery(
    [
      { key: "limit", value: "5" },
      { key: "page", value: `${current}` },
    ]
  );
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Room No.",
      dataIndex: "roomNo",
      key: "roomNo",
    },
    {
      title: "Floor No.",
      dataIndex: "floorNo",
      key: "floorNo",
      responsive: ["md"],
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      responsive: ["md"],
    },
    {
      title: "Price Per Slot",
      dataIndex: "pricePerSlot",
      key: "pricePerSlot",
      render: (price: string) => <p>$ {price}</p>,
    },
    {
      title: "Actions",
      render: (item: TRoom) => {
        return (
          <>
            <div className="md:flex hidden gap-2">
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
            <div className="md:hidden block">
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none h-12 px-2 hover:bg-slate-50 items-center flex gap-2">
                  <Button variant="ghost">...</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="font-medium">
                  <DropdownMenuItem>
                    <RoomDetailsCard id={item._id as string}></RoomDetailsCard>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UpdateRoom id={item._id as string}></UpdateRoom>
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
      <div className="flex p-4 items-center justify-between">
        <SectionHeading mode="dark">All Rooms</SectionHeading>
        <Link to="/admin/create-room">
          <Button>Create a Room</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        {roomData && (
          <>
            <Table
              loading={isFetching}
              dataSource={roomData}
              columns={columns}
              pagination={false}
            />
            <Pagination
              className="mx-auto my-6"
              total={meta.totalDocuments}
              pageSize={meta.limit}
              current={current}
              onChange={(value) => setCurrent(value)}
            ></Pagination>
          </>
        )}
      </div>
    </div>
  );
};

export default RoomListTable;
