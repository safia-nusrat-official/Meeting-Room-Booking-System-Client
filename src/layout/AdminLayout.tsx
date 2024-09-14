import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUser, logout } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { adminPaths } from "@/routes/admin.routes";
import { userPaths } from "@/routes/user.routes";
import { TSidebarLink } from "@/types/global.types";
import { TUser } from "@/types/user.types";
import { generateSideBarLinks } from "@/utility/routeUtils/generateSidebarLinks";
import { Button, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";

const AdminLayout = () => {
  const user = useAppSelector(getUser) as TUser;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    setTimeout(() => {
      navigate("/login");
      dispatch(logout());
    }, 600);
  };
  const sideBarItems: TSidebarLink[] =
    user.role === "user"
      ? [
          {
            key: "home",
            label: <NavLink to="/">Home</NavLink>,
          },
          {
            key: "meeting-rooms",
            label: <NavLink to={`/rooms`}>Meeting Rooms</NavLink>,
          },
          {
            key: "about-us",
            label: <NavLink to={`/about-us`}>About Us</NavLink>,
          },
          {
            key: "contact-us",
            label: <NavLink to={`/contact-us`}>Contact Us</NavLink>,
          },
          ...generateSideBarLinks(userPaths, "user"),
        ]
      : [
          {
            key: "home",
            label: <NavLink to="/">Back to Home</NavLink>,
          },
          ...generateSideBarLinks(adminPaths, "admin"),
        ];

  const [selectedKeys, setSelectedKeys] = useState("/");
  const [collapsed, setCollapsed] = useState(true);
  const userPanel = (
    <div className="flex pb-4 m-4 border-b-[1px] border-white gap-4">
      <Avatar className="">
        <AvatarImage src={user?.profileImage}></AvatarImage>
        <AvatarFallback className="font-medium">
          {user.name[0]}
          {user.name.split(" ")[1][0]}
        </AvatarFallback>
      </Avatar>
      <div className="text-white">
        <h4>{user.name}</h4>
        <p className="text-[#ffffff96] truncate text-ellipsis max-w-40 font-normal">
          {user.email}
        </p>
      </div>
    </div>
  );
  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedKeys("home");
    } else if (
      sideBarItems.find((item) => item.key === location.pathname.slice(1))
    ) {
      setSelectedKeys(location.pathname.slice(1));
    } else {
      setSelectedKeys("");
    }
  }, [location.pathname]);

  return (
    <Layout>
      <Sider
        className="bg-slate-900 bottom-0 -top-5 left-0 z-50 max-w-[320px]"
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        width={250}
        style={{
          paddingTop: "1rem",
          position: "fixed",
        }}
      >
        {userPanel}
        <Menu
          theme="dark"
          mode="inline"
          className="dashboard"
          items={sideBarItems}
          style={{
            paddingLeft: "14px",
            paddingRight: "14px",
            fontWeight: 600,
          }}
        />

        <div className="mx-8 mt-6">
          <Button
            onClick={handleLogout}
            className="rounded-sm py-[1.25rem] w-full"
          >
            Logout<CiLogout className="text-xl"></CiLogout>
          </Button>
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="border-b-[0.5px] md:hidden flex text-primaryColor bg-white border-zinc-200 px-4 md:px-12"
        >
          <button
            className="mr-4 text-2xl md:hidden block"
            onClick={() => setCollapsed(!collapsed)}
          >
            <div
              className={`w-6 mb-2 relative h-[3px] transition-all bg-primaryColor rounded-md ${
                collapsed ? "rotate-0 top-0" : "rotate-45 top-[3px]"
              }`}
            ></div>
            <div
              className={`w-6 h-[3px] relative transition-all bg-primaryColor rounded-md ${
                collapsed ? "rotate-0 top-0" : "-rotate-45 -top-[8px] "
              }`}
            ></div>
          </button>
          <Link
            to="/"
            style={{ fontFamily: "Kenao" }}
            className="demo-logo font-black md:text-[2rem] text-[1.5rem]"
          >
            MeetWise
          </Link>
          <div className="flex justify-center gap-2 items-center">
            <button onClick={handleLogout} className="text-2xl">
              <CiLogout></CiLogout>
            </button>
            <Avatar className="">
              <AvatarImage src={user.profileImage}></AvatarImage>
              <AvatarFallback className="font-medium">
                {user.name[0]}
                {user.name.split(" ")[1][0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </Header>
        <Layout>
          <Sider
            className="md:hidden font-Untitled-Sans block z-50 max-w-[320px] w-[320px]"
            collapsible
            collapsed={collapsed}
            trigger={null}
            breakpoint="lg"
            collapsedWidth="0"
            width="100%"
            onCollapse={setCollapsed}
            style={{
              position: "fixed",
              height: "100vh",
              top: "65px",
              width: "100% !important",
              paddingTop: "1rem",
            }}
          >
            <Menu
              onClick={() => setCollapsed(!collapsed)}
              theme="dark"
              mode="inline"
              selectedKeys={[selectedKeys]}
              items={sideBarItems}
              style={{
                paddingLeft: "14px",
                paddingRight: "14px",
              }}
            />
          </Sider>
          <Content
            style={{ height: "100vh", position: "relative" }}
            className="md:ml-[250px] ml-0"
          >
            <Outlet></Outlet>
            <Toaster richColors></Toaster>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
