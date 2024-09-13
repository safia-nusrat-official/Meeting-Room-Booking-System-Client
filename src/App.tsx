import { ConfigProvider } from "antd";
import MainLayout from "./layout/MainLayout";
import { Toaster } from "sonner";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#020817",
          borderRadius: 0,
          controlHeight: 36,
          fontFamily: "Inter",
          controlOutline: "#fff",
        },

        components: {
          Button: {
            colorPrimaryBg: "#020817",
            colorText: "#fff",
            fontWeight: 600,
          },
        },
      }}
    >
      <MainLayout></MainLayout>
      <div className="fixed bottom-0 h-screen right-0 z-[200]">
        <Toaster
          richColors={true}
          duration={2000}
          visibleToasts={1}
          position={"bottom-right"}
        ></Toaster>
      </div>
    </ConfigProvider>
  );
}

export default App;
