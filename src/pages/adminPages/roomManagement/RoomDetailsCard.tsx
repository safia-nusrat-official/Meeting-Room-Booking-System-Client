import { useGetSingleRoomQuery } from "@/redux/api/rooms.api";
import { Modal } from "antd";

import { TRoom } from "@/types/room.types";
import { Link } from "react-router-dom";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";

import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

import { Navigation, FreeMode, Thumbs, Pagination } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { Rate, Skeleton } from "antd";
import Swiper from "swiper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoChevronBack, IoChevronForward, IoKeyOutline } from "react-icons/io5";
import { LuArrowUpDown } from "react-icons/lu";
import { IoIosPeople } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { roomFloorNumbersMap } from "@/pages/rooms/RoomDetails";
import CustomSlider from "@/components/shared/customSlider";

const RoomDetailsCard = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const { data, isLoading, refetch } = useGetSingleRoomQuery(id, {
    skip: !open,
  });

  const [room, setRoom] = useState<TRoom | null>(null);

  useEffect(() => {
    if (!isLoading && data) {
      setRoom(data?.data);
    }
  }, [isLoading, data]);

  return (
    <>
      <Button variant="link" onClick={() => setOpen(true)}>
        See Details
      </Button>
      <Modal
        className="rounded-none"
        onCancel={() => setOpen(false)}
        loading={isLoading}
        title="Room Details"
        open={open}
        footer={null}
      >
        <div className="">
          {room && room.roomImages && (
            <CustomSlider
              isLoading={isLoading}
              images={room.roomImages}
            ></CustomSlider>
          )}
          <Card className="shadow-none h-fit font-Inter rounded-sm">
            {room && (
              <>
                <CardHeader>
                  <CardTitle>
                    <h1 className="font-bold text-4xl text-slate-800">
                      {room.name}
                    </h1>
                    <div className="flex items-center gap-2">
                      <Rate
                        allowHalf
                        defaultValue={room.rating}
                        disabled
                        className="mt-2  mb-4"
                      ></Rate>
                      <span className="text-slate-400">({room.rating})</span>
                    </div>
                  </CardTitle>
                  <CardDescription className="text-slate-600 mt-2">
                    {room.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex justify-between font-medium mb-4 text-slate-800 gap-2">
                    <p className="flex gap-2 items-center ">
                      <IoKeyOutline className="text-xl"></IoKeyOutline> Room No.{" "}
                      {room.roomNo}
                    </p>
                    <p className="flex gap-2 items-center">
                      <LuArrowUpDown className="text-xl"></LuArrowUpDown>
                      <span>
                        {room.floorNo}
                        <sup className="mr-2">
                          {room.floorNo < 4
                            ? roomFloorNumbersMap[
                                room.floorNo as keyof typeof roomFloorNumbersMap
                              ]
                            : "th"}
                        </sup>
                        Floor
                      </span>
                    </p>
                    <p className="flex gap-2 items-center">
                      <IoIosPeople className="text-2xl"></IoIosPeople>
                      Total Capacity {room.capacity}
                    </p>
                  </div>
                  <h1 className="font-bold text-2xl text-slate-800">
                    $ {room.pricePerSlot}
                    <span className="text-slate-600 text-lg ml-2">
                      per slot
                    </span>
                  </h1>
                </CardContent>
              </>
            )}

            {isLoading && (
              <CardContent className="p-6">
                <Skeleton paragraph round></Skeleton>
              </CardContent>
            )}
          </Card>
        </div>
      </Modal>
    </>
  );
};

export default RoomDetailsCard;
