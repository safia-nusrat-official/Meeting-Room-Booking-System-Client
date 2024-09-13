import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";

export default function RecentActivities(data: any) {
  const activities = data && data.data;

  return (
    <Card className="w-full rounded-sm col-span-5 bg-white shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-gray-800">
          Recent activity
        </CardTitle>
      </CardHeader>
      <CardDescription className="px-6 text-gray-600">
        Review what has happened over the past days.
      </CardDescription>
      <CardContent className="px-6 py-4">
        <ul className="space-y-4">
          {activities &&
            activities.map((activity: any, index: number) => (
              <li
                key={index}
                className="flex gap-8 items-start justify-between border-t border-gray-200 pt-4 first:border-t-0 first:pt-0"
              >
                <div className="flex items-start space-x-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.avatar} alt={activity.name} />
                    <AvatarFallback className="bg-gray-200 text-gray-600">
                      {activity.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none text-gray-800">
                      {activity.name}
                    </p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                </div>
                <p className="text-sm whitespace-nowrap text-gray-500">
                  {moment(activity.date).format("DD MMM YYYY")}
                </p>
              </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}
