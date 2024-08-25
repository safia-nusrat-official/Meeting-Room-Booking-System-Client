import { Layout, Button, Divider, Menu } from "antd";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/authSlice";
import { Footer } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import Sider from "antd/es/layout/Sider";
import { LuLogIn } from "react-icons/lu";

const { Content, Header } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const location = useLocation();
  const sideBarItems = [
    {
      key: "home",
      label: <NavLink to="/">Home</NavLink>,
    },
    {
      key: "meeting-rooms",
      label: <NavLink to={`/meeting-rooms`}>Meeting Rooms</NavLink>,
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
    }else if (
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
        className="border-[0.5px] text-primaryColor bg-white border-zinc-200 pl-4 pr-8 py-4 md:px-8"
      >
        <button
          className="mr-4 text-2xl md:hidden block"
          onClick={() => setCollapsed(!collapsed)}
        >
          <div
            className={`w-6 mb-2 relative h-[3px] transition-all bg-custom-primary rounded-md ${
              collapsed ? "rotate-0 top-0" : "rotate-45 top-[3px]"
            }`}
          ></div>
          <div
            className={`w-6 h-[3px] relative transition-all bg-custom-primary rounded-md ${
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
        <Menu
          onSelect={(k) => console.log(k)}
          className="hidden md:flex .nav-menu"
          mode="horizontal"
          selectedKeys={[selectedKeys]}
          items={sideBarItems}
          style={{
            marginLeft: "6rem",
            fontWeight: "600",
            fontSize: "1rem",
            background: "transparent",
            flex: 1,
            minWidth: 0,
          }}
        />
        <NavLink to="/login"
        className="flex items-center h-12 justify-center bg-primaryColor text-white rounded-md px-6 gap-2 font-semibold ">
          <LuLogIn className="text-xl"></LuLogIn> Login
        </NavLink>
      </Header>

      <Layout style={{ position: "relative" }}>
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
          <div className="demo-logo-vertical" />
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
          <div className="fixed bottom-0 h-screen right-0">
            {/* <Toaster
              richColors={true}
              duration={2000}
              visibleToasts={1}
              position={"bottom-right"}
            ></Toaster> */}
          </div>
        </Content>
      </Layout>

      <Footer className="py-[4rem] bg-primaryColor text-white selection:text-primaryColor selection:bg-secondaryColor">
        <div className="flex md:flex-row flex-col md:gap-6 gap-10 justify-between">
          {/* logo and socials */}
          <div className=" max-w-64">
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

          {/**links */}

          <div className="grid md:grid-cols-2 text-left gap-6 grid-cols-1">
            {/* col-2 */}
            <div>
              <h4 className="text-xl font-[500] mb-2">Quick Links</h4>
              <ul>
                <li>
                  <NavLink to="/products">Products</NavLink>
                </li>
                <li>
                  <NavLink to="/about-us">About Us</NavLink>
                </li>
                <li>
                  <NavLink to="/contact-us">Contact Us</NavLink>
                </li>
              </ul>
            </div>
            {/* col-3 */}
            <div>
              <h4 className="text-xl font-[500] mb-2">Contact Us</h4>
              <p>123 Street Name, City, Country</p>
              <p>Email: info@example.com</p>
              <p>Phone: +1234567890</p>
            </div>
          </div>
        </div>
        <Divider className="bg-zinc-500 my-12" />
        <p className="text-center">
          &copy; {new Date().getFullYear()} KeyWizards. All rights reserved.
        </p>
      </Footer>
    </Layout>
  );
};

export default MainLayout;
