import { MdAdminPanelSettings } from "react-icons/md";
import SectionHeading from "@/components/shared/SectionHeading";
import { TMeta, TReduxResponse } from "@/types";
import { Pagination, Select, Spin, Table, Tag } from "antd";
import { useState } from "react";
import { TUser } from "@/types/user.types";
import { ColumnsType } from "antd/es/table";
import {
  useChangeRoleOfUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/redux/api/user.api";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { PiTrashLight } from "react-icons/pi";
import { CardDescription } from "@/components/ui/card";
import confirm from "antd/es/modal/confirm";
import { CiCircleAlert } from "react-icons/ci";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/features/authSlice";

const UsersList = () => {
  const [current, setCurrent] = useState(1);

  const { data, isLoading, isFetching } = useGetAllUsersQuery([
    { key: "limit", value: "5" },
    { key: "page", value: `${current}` },
  ]);
  const userData: TUser[] =
    data && data?.data.map((user: TUser) => ({ ...user }));
  const [deleteUser] = useDeleteUserMutation();
  const meta: TMeta = data && data?.meta;
  const [changeRole, { isLoading: roleLoading }] =
    useChangeRoleOfUserMutation();

  const handleRoleChange = async ({
    id,
    role,
  }: {
    id: string;
    role: string;
  }) => {
    try {
      const res = (await changeRole({ role, id })) as TReduxResponse<any>;
      console.log(res);
      if (res.data) {
        console.log(res.data);
        toast.success("User Role Changed Successfully!");
      } else {
        console.log(res.error?.message || res.error?.data?.message);
        toast.error(res.error?.message || "User Role change Failed.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to change role");
    }
  };
  const columns: ColumnsType<TUser> = [
    {
      title: "User",
      className: "md:hidden block",
      render: (user: TUser) => {
        return (
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage src={user.profileImage}></AvatarImage>
              <AvatarFallback className="font-medium">
                {user.name[0]}
                {user.name[user.name.length - 1]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium ">{user.name}</p>
              <p className="max-w-28 text-ellipsis truncate overflow-hidden">
                {user.email}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Name",
      key: "name",
      className: "md:table-cell font-medium hidden",
      render: (user: TUser) => {
        return (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user.profileImage}></AvatarImage>
              <AvatarFallback className="font-medium">
                {user.name[0]}
                {user.name.split(" ").length > 1 && user.name.split(" ")[1][0]}
              </AvatarFallback>
            </Avatar>
            <p>{user.name}</p>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "md:table-cell max-w-28 overflow-hidden text-ellipsis  hidden",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      className: "md:table-cell hidden",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      className: "md:table-cell hidden",
    },
    {
      title: "Role",
      key: "role",
      render: (user: TUser) => {
        return (
          <Select
            defaultValue={user.role}
            style={{ width: 120 }}
            onChange={(value) =>
              handleRoleChange({ id: user._id as string, role: value })
            }
            popupMatchSelectWidth={false}
            disabled={roleLoading}
            dropdownRender={(menu) =>
              roleLoading ? <Spin size="small" /> : menu
            }
          >
            <Select.Option value="user">User</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
        );
      },
      className: "md:table-cell hidden",
    },

    {
      title: "Actions",
      render: (user: TUser) => {
        return (
          <>
            <Select
            className="md:hidden table-cell"
              defaultValue={user.role}
              style={{ width: 120 }}
              size="small"
              onChange={(value) =>
                handleRoleChange({ id: user._id as string, role: value })
              }
              popupMatchSelectWidth={false}
              disabled={roleLoading||user.isDeleted}
              dropdownRender={(menu) =>
                roleLoading ? <Spin size="small" /> : menu
              }
            >
              <Select.Option value="user">User</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
            <Button
            size={"sm"}
              disabled={user.isDeleted}
              onClick={() => handleDelete(user._id as string)}
              variant={"destructive"}
              className="mt-2 w-full"
            >
              {!user.isDeleted ? "Delete" : "Deleted"}
              <PiTrashLight className="text-lg ml-2"></PiTrashLight>
            </Button>
          </>
        );
      },
    },
  ];

  const handleDelete = async (id: string) => {
    confirm({
      title: "Are you sure delete this user?",
      icon: <CiCircleAlert className="text-4xl mr-2" />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      okCancel: true,
      async onOk() {
        try {
          const res = (await deleteUser(id)) as TReduxResponse<any>;
          if (res.data) {
            console.log(res.data);
            toast.success("User Deleted Successfully!");
          } else {
            console.log(res.error?.message || res.error?.data?.message);
            toast.error(res.error?.message || "User Delete Failed.");
          }
        } catch (error) {
          console.log(error);
        }
      },
      onCancel() {},
    });
  };

  return (
    <div className="">
      <div className="md:p-8 px-4 pb-0 pt-6 w-full">
        <SectionHeading mode="dark">All Users</SectionHeading>
        <CardDescription className="md:hidden block">
          Click on the roles to make users admin and click on tags to delete
          them from database
        </CardDescription>
        <CardDescription className="hidden md:block">
          See all Users, Make them admins or Delete their profiles
        </CardDescription>
      </div>
      <div className="flex flex-col gap-4 mt-6">
      <Table
              size="small"
              className="md:hidden block"
              
              bordered
              loading={isLoading || isFetching}
              dataSource={userData}
              columns={columns}
              pagination={false}
            />
            <Table
              className="hidden md:table"
              loading={isLoading || isFetching}
              dataSource={userData}
              columns={columns}
              pagination={false}
            />
            {data && meta?.totalDocuments > meta?.limit && (
              <Pagination
                className="mx-auto my-6"
                total={meta?.totalDocuments}
                pageSize={meta?.limit}
                current={current}
                onChange={(value) => setCurrent(value)}
              ></Pagination>
            )}
      </div>
    </div>
  );
};

export default UsersList;
