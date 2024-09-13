import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RevenueGraph } from "./dashboardComponents/RevenueGraph";
import { RecentTransactions } from "./dashboardComponents/RecentTransactions";
import OverviewCards from "./dashboardComponents/OverviewCards";
import { PayemntPieChart } from "./dashboardComponents/PaymentPieChart";
import RecentActivities from "./dashboardComponents/RecentActivites";
import BookingStatus from "./dashboardComponents/BookingStatus";
import { RegisteredUsers } from "./dashboardComponents/RegisteredUsers";
import moment from "moment";
import { useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/features/authSlice";
import { TUser } from "@/types/user.types";
import { QuickAccess } from "./dashboardComponents/QuickAccess";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetDashboardDataQuery } from "@/redux/api/dashboard.api";
import { Skeleton } from "antd";

const AdminDashboard = () => {
  const user = useAppSelector(getUser) as TUser;
  const { data, isLoading } = useGetDashboardDataQuery([]);
  const dashboardData = !isLoading && data?.data;

  return (
    <section className="md:p-10 p-4 bg-slate-100">
      <div className="flex flex-wrap items-center justify-between space-y-2">
        <QuickAccess></QuickAccess>

        <div className="hidden md:flex flex-col items-end font-bold">
          <Avatar>
            <AvatarImage src={user.profileImage}></AvatarImage>
            <AvatarFallback className="font-medium">
              {user.name[0]}
              {user.name.split(" ").length > 1 && user.name.split(" ")[1][0]}
            </AvatarFallback>
          </Avatar>

          <span className="text-xl">Welcome back {user.name.split(" ")[0]}!</span>
          <span className="font-medium">
            {moment().format("Do MMMM YYYY, dddd")}
          </span>
        </div>
      </div>

      <div className="grid gap-4 my-6 grid-cols-4">
        <OverviewCards></OverviewCards>

        <div className="grid gap-4 md:grid-cols-2 grid-cols-1 col-span-4 lg:grid-cols-7">
          {/* revenue graph */}
          <Card className="shadow-none col-span-4 rounded-sm">
            <CardHeader>
              {dashboardData ? (
                <CardTitle className="font-bold text-2xl">
                  Total Revenue $
                  {Number(dashboardData?.totalRevenue).toFixed(2)}
                </CardTitle>
              ) : (
                <Skeleton></Skeleton>
              )}
            </CardHeader>
            <CardContent className="pl-2">
              <RevenueGraph revenueData={dashboardData?.revenueThisWeek} />
            </CardContent>
          </Card>

          {/* recente transactions */}
          <Card className="col-span-3 shadow-none rounded-sm">
            <CardHeader>
              <CardTitle>Recent Transaction</CardTitle>
              <CardDescription>
                You made {dashboardData?.totalPayments} sales this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentTransactions data={dashboardData?.transactionsThisWeek} />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 col-span-4 lg:grid-cols-8">
          {/* payment method piechart */}
          <PayemntPieChart data={dashboardData} />

          {/* recent activites chart piechart */}
          <RecentActivities data={dashboardData?.recentActivities} />
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 col-span-4 lg:grid-cols-8">
          {/* Recent Bookings */}
          <BookingStatus />

          {/* Registered Users */}
          <RegisteredUsers/>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
