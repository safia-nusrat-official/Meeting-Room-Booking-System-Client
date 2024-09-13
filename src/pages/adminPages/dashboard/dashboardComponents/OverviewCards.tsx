import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDashboardDataQuery } from "@/redux/api/dashboard.api";
import { BiDollar } from "react-icons/bi";
import { CiClock1, CiClock2, CiTimer } from "react-icons/ci";
import { Link } from "react-router-dom";

const OverviewCards = () => {
  const { data, isLoading } = useGetDashboardDataQuery([]);
  console.log(data);
  const { totalBookings, totalRooms, totalSlots, totalUsers } = (data &&
    data?.data) || {
    totalBookings: 0,
    totalRooms: 0,
    totalSlots: 0,
    totalUsers: 0,
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 col-span-4 grid-cols-2 lg:grid-cols-4">
      <Link to="/admin/bookings-list">
        <Card className="shadow-none hover:bg-[#cccccc7f] rounded-sm">
          <CardHeader className="flex gap-2  flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookings
            </CardTitle>
            <BiDollar className="text-slate-400 md:text-xl text-4xl"></BiDollar>
          </CardHeader>
          <CardContent className="">
            <div className="text-2xl font-bold">{totalBookings}</div>

            {/* recent bookings today */}
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
      </Link>
      <Link to="/admin/all-users">
        <Card className="shadow-none rounded-sm">
          <CardHeader className="flex flex-row gap-2 items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {/* recent signups */}
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
      </Link>

      <Link to="/admin/rooms-list">
        <Card className="shadow-none  h-full rounded-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRooms}</div>
            {/*  */}
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
      </Link>
      <Link to="/admin/slots-list">
        <Card className="shadow-none  h-full rounded-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Slots</CardTitle>
            <CiClock2 className="text-lg text-slate-500"></CiClock2>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSlots}</div>
            {/* total booked */}
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default OverviewCards;
