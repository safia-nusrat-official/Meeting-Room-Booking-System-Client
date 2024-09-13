import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "antd";

export const RecentTransactions = (data: any) => {
  console.log(data);

  return (
    <div className="space-y-8">
      {data?.data?.length > 0 ?
        data?.data.map((booking: any) => (
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src={booking?.user?.profileImage} alt="Avatar" />
              <AvatarFallback>{booking?.user?.name[0]}{booking?.user?.name.split(' ')[1][0]}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {booking?.user?.name}
              </p>
              <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis max-w-24 md:max-w-36">
                {booking?.user?.email}
              </p>
            </div>
            <div className="ml-auto font-medium">
              +${Number(booking?.totalAmount).toFixed(2)}
            </div>
          </div>
        )):<Skeleton></Skeleton>}
    </div>
  );
};
