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
import { RoomsAndSlots } from "./dashboardComponents/RoomsAndSlots";
import moment from "moment";
import { useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/features/authSlice";
import { TUser } from "@/types/user.types";
import { QuickAccess } from "./dashboardComponents/QuickAccess";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AdminDashboard = () => {
  const user = useAppSelector(getUser) as TUser;
  return (
    <section className="md:p-10 bg-slate-100">
      <div className="flex items-center justify-between space-y-2">
        <QuickAccess></QuickAccess>

        <div className="flex flex-col items-end font-bold">
          <Avatar>
            <AvatarImage src={user.profileImage}></AvatarImage>
            <AvatarFallback></AvatarFallback>
          </Avatar>

          <span className="text-xl">Welcome back {user.name}!</span>
          <span className="font-medium">
          {moment().format("Do MMMM YYYY, dddd")}            
          </span>
        </div>
      </div>

      <div className="grid gap-4 my-6 grid-cols-4">
        <OverviewCards></OverviewCards>

        <div className="grid gap-4 md:grid-cols-2 col-span-4 lg:grid-cols-7">
          {/* revenue graph */}
          <Card className="shadow-none col-span-4 rounded-sm">
            <CardHeader>
              <CardTitle className="font-bold text-2xl">Revenue</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <RevenueGraph />
            </CardContent>
          </Card>

          {/* recente transactions */}
          <Card className="col-span-3 shadow-none rounded-sm">
            <CardHeader>
              <CardTitle>Recent Transaction</CardTitle>
              <CardDescription>You made 265 sales this month.</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentTransactions />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 col-span-4 lg:grid-cols-8">
          {/* payment method piechart */}
          <PayemntPieChart />

          {/* recent activites chart piechart */}
          <RecentActivities />
        </div>

        <div className="grid gap-4 md:grid-cols-2 col-span-4 lg:grid-cols-8">
          {/* Recent Bookings */}
          <BookingStatus />

          {/* Registered Users */}
          <RegisteredUsers />
        </div>

        <div className="grid gap-4 md:grid-cols-2 col-span-4 lg:grid-cols-8">
          {/* payment method piechart */}
          {/* <Card className="shadow-none col-span-8 rounded-sm">
            <CardHeader>
              <CardTitle>Rooms & Slots</CardTitle>
              <CardDescription>
                A brief glance at rooms and slots
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              {rooms.length > 0 &&
                rooms.map((room: TRoom) => (
                  <Link to={`/rooms/${room?._id}`} className="flex gap-2 border rounded-md font-medium">
                    <img
                      src={room?.roomImages[0]}
                      className="w-24 rounded-sm"
                    />
                    <div className="p-2">
                      <p className="text-slate-500 text-xs">
                        Room No. {(room as TRoom)?.roomNo}
                      </p>
                      <p className="text-lg">{(room as TRoom)?.name}</p>
                      <span className="text-slate-500 flex items-center">
                        <Rate className="scale-75" count={1} value={1}></Rate>{" "}
                        {(room as TRoom)?.rating}
                      </span>
                    </div>
                  </Link>
                ))}
              {isLoading && Array(3).map(() => <Skeleton active></Skeleton>)}
            </CardContent>
          </Card> */}

          <RoomsAndSlots></RoomsAndSlots>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
