import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button as ShadBtn } from "@/components/ui/button";
import { Layout, Button, Menu } from "antd";
import "../style/customNav.css";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getUser, logout } from "../redux/features/authSlice";
import { Footer } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import Sider from "antd/es/layout/Sider";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { CiCalendar, CiLogout } from "react-icons/ci";
import { PiPresentationChartLight } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Toaster } from "sonner";

const { Content, Header } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(getUser);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const location = useLocation();
  const sideBarItems = [
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
  ];
  const [selectedKeys, setSelectedKeys] = useState("/");
  const [collapsed, setCollapsed] = useState(true);

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
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className="border-b-[0.5px] text-primaryColor bg-white border-zinc-200 px-4 md:px-12"
      >
        <div className="flex items-center">
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
            className="demo-logo font-[600] md:text-[2rem] text-[1.5rem]"
          >
            MeetWise
          </Link>
        </div>
        <Menu
          className="hidden md:flex md:pl-20 nav-menu"
          mode="horizontal"
          selectedKeys={[selectedKeys]}
          items={sideBarItems}
          style={{
            marginLeft: "6rem",
            fontWeight: "600",
            fontSize: "1rem",
            flex: 1,
            minWidth: 0,
          }}
        />

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none h-12 px-2 hover:bg-slate-50 items-center flex gap-2">
              <p className="md:block hidden">{user.name}</p>
              <Avatar className="">
                <AvatarImage src={user?.profileImage}></AvatarImage>
                <AvatarFallback className="font-medium">
                  {user.name[0]}
                  {user.name.split(" ")[1][0]}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            {user.role === "user" ? (
              <DropdownMenuContent className="font-medium">
                <DropdownMenuItem>
                  <Link
                    to="/user/my-bookings"
                    className="flex gap-2 justify-between items-center"
                  >
                    My Bookings<CiCalendar className="text-xl"></CiCalendar>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={handleLogout}
                    className="flex gap-2 w-full justify-between items-center"
                  >
                    Logout<CiLogout className="text-xl"></CiLogout>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            ) : (
              <DropdownMenuContent className="font-medium">
                <DropdownMenuItem>
                  <Link
                    to="/admin/dashboard"
                    className="flex gap-2 justify-between items-center"
                  >
                    Dashboard
                    <PiPresentationChartLight className="text-xl"></PiPresentationChartLight>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={handleLogout}
                    className="flex gap-2 w-full justify-between items-center"
                  >
                    Logout<CiLogout className="text-xl"></CiLogout>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        ) : (
          <NavLink to={`/login`}>
            <ShadBtn className="text-xs md:text-sm h-fit p-[8px] justify-self-end hover:border-slate-800 hover:border-2 hover:bg-transparent font-semibold hover:text-slate-800 bg-slate-800 rounded-none">
              Login / Register
            </ShadBtn>
          </NavLink>
        )}
      </Header>

      <Layout style={{ position: "relative" }}>
        <Sider
          className="md:hidden sidebar-nav block z-50 max-w-[320px] w-[320px]"
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
        <Content>
          <Outlet></Outlet>
          <Toaster richColors></Toaster>
        </Content>
      </Layout>

      <Footer className="py-[4rem] bg-slate-800 text-white selection:text-slate-800 font-normal selection:bg-secondaryColor">
        <div className="flex md:flex-row flex-col md:gap-6 gap-10 justify-between">
          {/* logo and socials */}
          <div className="max-w-64">
            <h3
              style={{
                fontSize: "2rem",
                marginBottom: "0.5rem",
                fontWeight: 600,
                fontFamily: "Kenao",
              }}
            >
              MeetWise
            </h3>
            <span>
              Seamlessly book, manage, and optimize meeting spaces, empowering
              your team to collaborate and achieve more efficiently.
            </span>
          </div>

          <div className="grid md:grid-cols-3 text-left gap-6 grid-cols-1">
            {/* col-2 */}
            <div>
              <h4 className="text-xl font-bold mb-2">Address</h4>
              <p>
                The Hoteller
                <br />
                456 Urban Avenue Cityville,
                <br />
                NY 10001 United States
              </p>
            </div>
            {/* col-3 */}
            <div>
              <h4 className="text-xl font-semibold mb-2">Contact Us</h4>
              <p>info@example.com</p>
              <p>+1234567890</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Follow Us</h4>
              <div className="flex gap-4 text-xl">
                <FaFacebook></FaFacebook>
                <FaInstagram></FaInstagram>
                <FaYoutube></FaYoutube>
                <FaTwitter></FaTwitter>
              </div>
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col-reverse md:items-end items-center justify-between">
          <Link to="/rooms" className="md:block hidden">
            <Button
              type="primary"
              className="mt-6  border-none bg-white hover:border-none hover:bg-muted-foreground font-bold text-slate-800 rounded-none"
            >
              Book Now
            </Button>
          </Link>
          <p className="text-center md:mt-0 mt-8">
            &copy; {new Date().getFullYear()} KeyWizards. All rights reserved.
          </p>

          <div className="flex md:mt-0 mt-8  md:flex-row flex-col">
            <p className="hover:underline underline-offset-2 text-[#ffffff65]">
              Privacy Policy
            </p>
            <span className="hover:underline md:ml-4 ml-0 underline-offset-2 text-[#ffffff65]">
              Terms & Conditions
            </span>
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export default MainLayout;
