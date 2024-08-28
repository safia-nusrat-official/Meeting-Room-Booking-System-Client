import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TRoom } from "@/types/room.types";
import { Card } from "antd";
import { FaDollarSign, FaUser } from "react-icons/fa";

export const RoomCard = ({ room }: { room: TRoom }) => (
  <Card className="w-full max-w-sm overflow-hidden">
    <img
      src={room.roomImages[0]}
      alt={room.name}
      className="w-full h-48 object-cover"
    />
    <CardHeader>
      <CardTitle>{room.name}</CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <FaUser className="w-4 h-4" />
        <span>Up to {room.capacity} people</span>
      </div>
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
        <FaDollarSign className="w-4 h-4" />
        <span>${room.pricePerSlot} per Slot</span>
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full">See Details</Button>
    </CardFooter>
  </Card>
);
