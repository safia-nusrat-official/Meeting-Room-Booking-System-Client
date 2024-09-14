import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAllUsersQuery } from "@/redux/api/user.api";
import { TUser } from "@/types/user.types";
import { Skeleton, Tag } from "antd";

export function RegisteredUsers() {
  const { data } = useGetAllUsersQuery([
    {
      key:"sort", value:"-createdAt"
    }
  ]);

  return (
    <Card className="shadow-none rounded-sm col-span-4">
      <CardHeader>
        <CardTitle>Registered Users</CardTitle>
        <CardDescription>
          Invite your team members to collaborate.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid p-0">
        {data ? (
          data?.data.map((user: TUser) => (
            <div className="flex hover:bg-[#eeeeee91] p-4 items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/avatars/01.png" />
                  <AvatarFallback>
                    {user.name[0]}
                    {user.name.split(" ").length > 1 &&
                      user.name.split(" ")[1][0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-sm text-muted-foreground truncate text-ellipsis md:max-w-72 max-w-32">{user.email}</p>
                </div>
              </div>
              <Tag
                className="font-medium cursor-pointer"
                color={user.role === "user" ? "geekblue" : "volcano"}
              >
                {user.role}
              </Tag>
            </div>
          ))
        ) : (
          <Skeleton></Skeleton>
        )}
      </CardContent>
    </Card>
  );
}
