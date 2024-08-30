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
import { TUser } from "@/types/user.types";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import { useGetAllUsersQuery } from "@/redux/api/user.api";

const UsersList = () => {
  const [current, setCurrent] = useState(1);
  const { data, isLoading, isFetching } = useGetAllUsersQuery([
    { key: "limit", value: "7" },
    { key: "page", value: `${current}` },
  ]);
  const userData: TSlot[] =
    data && data?.data.map((slot: TSlot) => ({ ...slot }));

  const meta: TMeta = data && data?.meta;

  // const handleDelete = async (id: string) => {
  //   confirm({
  //     title: "Are you sure delete this slot?",
  //     icon: <CiCircleAlert className="text-4xl mr-2" />,
  //     content: `Slot for ${
  //       userData.filter((slot) => slot._id === id)[0].room?.name
  //     } will be removed from the database permanently.`,
  //     okText: "Yes",
  //     okType: "danger",
  //     cancelText: "No",
  //     okCancel: true,
  //     async onOk() {
  //       try {
  //         const res = (await deleteSlot(id)) as TReduxResponse<any>;
  //         if (res.data) {
  //           console.log(res.data);
  //           toast.success("Slot Deleted Successfully!");
  //         } else {
  //           console.log(res.error?.message || res.error?.data?.message);
  //           toast.error(res.error?.message || "Slot Delete Failed.");
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     },
  //     onCancel() {},
  //   });
  // };

  const columns: ColumnsType<TSlot> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        return (
          <Tag color={role === "admin" ? "red" : "processing"}>{`${role}`}</Tag>
        );
      },
    },
    //   {
    //     title: "isDeleted",
    //     dataIndex: "isDeleted",
    //     key: "isDeleted",
    //     render: (isDeleted) => {
    //         return <Tag color={isDeleted? "blue" : "red"}>{`${isDeleted}`}</Tag>;
    //       },
    //   },
    //   {
    //     title: "Actions",
    //     render: (item: TSlot) => {
    //       return (
    //         <>
    //           <div className="hidden md:flex gap-2">
    //             {/* <UpdateSlot id={item._id as string}></UpdateSlot> */}
    //             <Button
    //             //   onClick={() => handleDelete(item._id as string)}
    //               variant={"destructive"}
    //             >
    //               Delete
    //               <PiTrashLight className="text-lg ml-2"></PiTrashLight>
    //             </Button>
    //           </div>
    //           <div className="md:hidden block">
    //             <DropdownMenu>
    //               <DropdownMenuTrigger className="outline-none h-12 px-2 hover:bg-slate-50 items-center flex gap-2">
    //                 <Button variant="ghost">...</Button>
    //               </DropdownMenuTrigger>
    //               <DropdownMenuContent className="font-medium">
    //                 <DropdownMenuItem>
    //                   {/* <UpdateSlot id={item._id as string}></UpdateSlot> */}
    //                 </DropdownMenuItem>
    //                 <DropdownMenuItem>
    //                   <Button
    //                     onClick={() => handleDelete(item._id as string)}
    //                     variant={"destructive"}
    //                   >
    //                     Delete
    //                     <PiTrashLight className="text-lg ml-2"></PiTrashLight>
    //                   </Button>{" "}
    //                 </DropdownMenuItem>
    //               </DropdownMenuContent>
    //             </DropdownMenu>
    //           </div>
    //         </>
    //       );
    //     },
    //   },
  ];
  return (
    <div className="md:p-8">
      <div className="flex md:p-0 px-4 pb-0 pt-6 w-full items-center justify-between">
        <SectionHeading mode="dark">All Users</SectionHeading>
        {/* <Link to="/admin/create-slot">
            <Button>Create a Slot</Button>
          </Link> */}
      </div>
      <div className="flex flex-col gap-4 mt-6">
        {data && (
          <>
            <Table
              size="small"
              className="md:hidden block"
              style={{
                padding: "4px",
              }}
              bordered
              loading={isFetching}
              dataSource={userData}
              columns={columns}
              pagination={false}
            />
            <Table
              className="hidden md:block"
              loading={isFetching}
              dataSource={userData}
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
          </>
        )}
      </div>
    </div>
  );
};

export default UsersList;
