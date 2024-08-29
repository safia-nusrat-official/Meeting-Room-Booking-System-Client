import { getUser, logout } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types/user.types";
import { Avatar, Button, Divider, Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { CiLogout } from "react-icons/ci";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";

const AdminLayout = () => {
  const user = useAppSelector(getUser) as TUser;
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const handleLogout = () => {
    setTimeout(() => {
      navigate("/login")
      dispatch(logout())
    }, 600);
  };
  const sideBarItems = [
    {
      key: "dashboard",
      label: <NavLink to="/admin/dashboard">Dashboard</NavLink>,
    },
    {
      key: "rooms-list",
      label: <NavLink to={`/admin/rooms-list`}>Manage Rooms</NavLink>,
    },
    {
      key: "slots-list",
      label: <NavLink to={`/admin/slots-list`}>Manage Slots</NavLink>,
    },
    {
      key: "bookings-list",
      label: <NavLink to={`/admin/bookings-list`}>Manage Bookings</NavLink>,
    },
    {
      key: "users-list",
      label: <NavLink to={`/admin/all-users`}>Manage Users</NavLink>,
    },
    {
      key: "home",
      label: <NavLink to={`/`}>Back to Home</NavLink>,
    },
  ];
  return (
    <Layout>
      <Sider
        className="bg-slate-900 bottom-0 top-0 left-0 flex flex-col z-50 max-w-[320px]"
        collapsible
        trigger={null}
        breakpoint="lg"
        collapsedWidth="0"
        width={250}
        style={{
          paddingTop: "1rem",
          position:"fixed"
        }}
      >
        <div className="flex pb-4 m-4 border-b-[1px] border-white gap-4">
          <Avatar></Avatar>
          <div className="text-white">
            <h4>{user.name}</h4>
            <p className="text-[#ffffff96] font-normal">{user.email}</p>
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          className="dashboard"
          items={sideBarItems}
          style={{
            paddingLeft: "14px",
            paddingRight: "14px",
            fontWeight:600
          }}
        />
        <Button
          onClick={handleLogout}
          className="m-8 rounded-none text-white py-[1.5rem]  hover:bg-transparent font-bold hover:text-slate-800 bg-transparent"
        >
          Logout<CiLogout className="text-xl"></CiLogout>
        </Button>
      </Sider>
      <Layout>
        <Content style={{height:"100vh", position:"relative"}} className="md:ml-[250px] ml-0">
          <Outlet></Outlet>
          <div className="fixed bottom-0 h-screen right-0">
            <Toaster
              richColors={true}
              duration={2000}
              visibleToasts={1}
              position={"bottom-right"}
            ></Toaster>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
