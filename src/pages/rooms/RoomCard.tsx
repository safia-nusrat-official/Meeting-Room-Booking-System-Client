import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TRoom } from "@/types/room.types";
import { AiOutlineDollar } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { LuArrowUpDown } from "react-icons/lu";
import { Link } from "react-router-dom";
import { roomFloorNumbersMap } from "./RoomDetails";
import { Rate, Skeleton } from "antd";
import { IoChevronForward, IoKeyOutline } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import CustomSlider from "@/components/shared/CustomSlider";

export const RoomCard = ({
  room,
  size = "md",
}: {
  room: TRoom;
  size?: "sm" | "md" | "lg";
}) => {
  const { roomImages, name, pricePerSlot, _id, capacity, floorNo, rating } =
    room;
  return size === "md" ? (
    <Card className="w-full max-w-sm border-0 rounded-sm overflow-hidden">
      <img
        src={roomImages[0]}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <CardHeader className="px-6 pb-0 pt-4">
        <CardTitle className="font-semibold text-2xl">{name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-2 px-6">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <CiUser className="w-4 h-4" />
          <span>Up to {capacity} people</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
          <AiOutlineDollar className="w-4 h-4" />
          <span>${pricePerSlot} per Slot</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/rooms/${_id}`} className="w-full">
          <Button className="w-full bg-primaryColor rounded-sm hover:border-[1px] hover:bg-white hover:border-slate-900 hover:text-slate-800">
            See Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  ) : size === "sm" ? (
    <Link className="w-full" to={`/rooms/${_id}`}>
      <Card className="w-full max-w-sm border-0 relative hover:scale-105 transition-all rounded-sm overflow-hidden">
        <img
          src={roomImages[0]}
          alt={name}
          className="w-full h-28 object-cover"
        />
        <Link
          className="bg-white rounded-full p-2 absolute border-[1px] border-slate-200 right-5 top-5"
          to={`/rooms/${_id}`}
        >
          <IoChevronForward></IoChevronForward>
        </Link>
        <CardHeader className="px-6 pb-0 pt-4">
          <CardTitle className="font-semibold text-2xl cursor-pointer">
            {name}
          </CardTitle>
          <div className="flex items-center gap-2 text-lg font-medium">
            {rating}
            <Rate
              allowHalf
              count={1}
              defaultValue={rating}
              disabled
              className=""
            ></Rate>
          </div>
        </CardHeader>
        <CardContent className="pt-2 px-6 cursor-pointer">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <CiUser className="w-4 h-4" />
            <span>Up to {capacity} people</span>
          </div>
          <div className="flex items-center text-lg space-x-2 gap-[14px] mb-2 text-muted-foreground mt-2">
            $ <span className="text-sm ">{pricePerSlot} per Slot</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <LuArrowUpDown className="text-xl"></LuArrowUpDown>
            <span>
              {floorNo}
              <sup className="mr-2">
                {floorNo < 4
                  ? roomFloorNumbersMap[
                      floorNo as keyof typeof roomFloorNumbersMap
                    ]
                  : "th"}
              </sup>
              Floor
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  ) : (
    <div className="grid grid-cols-1">
      {/*  */}

      <Card className="shadow-none rounded-sm mt-6">
        <CardHeader>
          <CardTitle>{room.name}</CardTitle>
          <CardDescription>
            Spacious room with a beautiful city view
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-hidden">
            {roomImages && (
              <CustomSlider
                isLoading={false}
                images={roomImages}
              ></CustomSlider>
            )}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <IoKeyOutline className="h-5 w-5 text-primary" />
              <span>Room No. {room.roomNo}</span>
            </div>
            <div className="flex items-center gap-2">
              <LuArrowUpDown className="h-5 w-5 text-primary" />
              <span>Floor No. {room.floorNo}</span>
            </div>
            <div className="flex items-center gap-2">
              <IoIosPeople className="h-5 w-5 text-primary" />
              <span>
                Up to{" "}
                {room.capacity > 1
                  ? `${room.capacity} people`
                  : `${room.capacity} person`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Rate defaultValue={room.rating} allowHalf disabled />
              <span>{room.rating}</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <h3 className="font-semibold">Description</h3>
            <p className="text-sm text-muted-foreground">{room.description}</p>
          </div>
          <div className="mt-4 space-y-2">
            <h3 className="font-semibold">Price</h3>
            <p className="text-2xl font-bold">
              $199{" "}
              <span className="text-sm font-normal text-muted-foreground">
                per slot
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
