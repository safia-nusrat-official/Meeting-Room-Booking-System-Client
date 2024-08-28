import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  useDeleteRoomMutation,
  useGetAllAvailableRoomsQuery,
} from "@/redux/api/rooms.api";
import { TReduxResponse } from "@/types";
import { TRoom } from "@/types/room.types";
import { Table } from "antd";
import confirm from "antd/es/modal/confirm";
import { CiCircleAlert } from "react-icons/ci";
import { IoAlertCircleOutline } from "react-icons/io5";
import { PiTrashLight } from "react-icons/pi";
import { SlPencil } from "react-icons/sl";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const RoomListTable = () => {
  const { data, isLoading, isFetching } = useGetAllAvailableRoomsQuery([]);
  const [deleteRoom, { DeleteLoading }] = useDeleteRoomMutation();
  const roomData: TRoom[] =
    !isLoading &&
    data?.data.map((room: TRoom) => ({ ...room, key: room._id as string }));
  console.log(roomData);

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
            toast.success("Room Created Successfully!");
          } else {
            console.log(res.error?.message || res.error?.data?.message);
            toast.success(res.error?.message || "Room Created Successfully!");
          }
        } catch (error) {
          console.log(error);
        }
      },
      onCancel() {
      },
    });
  };

  const columns = [
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
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
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
        console.log(item);
        return (
          <div className="flex gap-2">
            <Button variant="link">See Details</Button>
            <Button variant={"outline"}>
              Update
              <SlPencil className="text-md ml-2"></SlPencil>
            </Button>
            <Button
              onClick={() => handleDelete(item._id as string)}
              variant={"destructive"}
            >
              Delete
              <PiTrashLight className="text-lg ml-2"></PiTrashLight>
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="md:p-8">
      <div className="flex items-center justify-between">
        <SectionHeading mode="dark">All Rooms</SectionHeading>
        <Link to="/admin/create-room">
          <Button>Create a Room</Button>
        </Link>
      </div>
      <div className="mt-6">
        {roomData.length > 0 && (
          <Table
            loading={isFetching}
            dataSource={roomData}
            columns={columns}
            pagination={false}
          />
        )}
      </div>
    </div>
  );
};

export default RoomListTable;
