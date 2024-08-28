import { ConfigProvider } from "antd";
import MainLayout from "./layout/MainLayout";

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
          colorIcon: "#020817",
        },
      
        components: {
          Button: {
            colorPrimaryBg: "#020817",
            colorText: "#fff",
            fontWeight: 600,
          },
          Form: {
            fontSizeSM: 12,
          },
        },
      }}
    ><MainLayout></MainLayout>
    </ConfigProvider>
  );
}

export default App;
