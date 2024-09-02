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
import { Label } from "@radix-ui/react-dropdown-menu";
import { Tag } from "antd";

export function RegisteredUsers() {
  const { data, isLoading } = useGetAllUsersQuery([]);
  console.log(data)
  return (
    <Card className="shadow-none rounded-sm col-span-4">
      <CardHeader>
        <CardTitle>Registered Users</CardTitle>
        <CardDescription>
          Invite your team members to collaborate.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {data &&
          data?.data.map((user: TUser) => (
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/avatars/01.png" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Tag className="font-medium" color={user.role==="user"?"geekblue":"volcano"}>{user.role}</Tag>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
