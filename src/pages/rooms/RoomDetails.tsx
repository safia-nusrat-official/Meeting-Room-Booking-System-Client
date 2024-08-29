import "swiper/css/free-mode";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  useGetAllAvailableRoomsQuery,
  useGetSingleRoomQuery,
} from "@/redux/api/rooms.api";
import { TRoom } from "@/types/room.types";
import { Link, useParams } from "react-router-dom";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";

import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, FreeMode, Thumbs, Pagination } from "swiper/modules";
import { ReactNode, useEffect, useRef, useState } from "react";
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
import { RoomCard } from "./RoomCard";

export const roomFloorNumbersMap = {
  1: "st",
  2: "nd",
  3: "rd",
};

const RoomDetails = () => {
  const thumbsSwiper = useRef<Swiper | null>(null);
  const prevRef = useRef<any | null>(null);
  const nextRef = useRef<any | null>(null);

  const { id } = useParams();
  const { data: suggestedRooms, isLoading: sLoading } =
    useGetAllAvailableRoomsQuery([
      { key: "limit", value: "2" },
      { key: "page", value: `${Math.floor(Math.random() * 3)}` },
    ]);

  const { data, isLoading } = useGetSingleRoomQuery(id as string);
  const [room, setRoom] = useState<TRoom | null>(null);

  useEffect(() => {
    if (!isLoading && data) {
      setRoom(data?.data);
    }
  }, [isLoading, data]);

  return (
    <section className="md:p-12 selection:bg-secondaryColor/45">
      <Breadcrumb className="md:m-0 mx-auto">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/rooms">Rooms</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {room ? (
                <p>{room.name}</p>
              ) : (
                <Skeleton.Button
                  shape="round"
                  style={{ height: "12px" }}
                  active
                />
              )}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-6 mt-6 md:grid-cols-2 grid-cols-1">
        <div className="relative img-container">
          <div className="flex px-4 z-20 justify-between items-center absolute w-full h-1/2 top-0 left-0">
            <button
              className="bg-white rounded-full p-2 text-slate-500 text-xl"
              ref={prevRef}
            >
              <IoChevronBack></IoChevronBack>
            </button>
            <button
              className="bg-white rounded-full p-2 text-slate-500 text-xl"
              ref={nextRef}
            >
              <IoChevronForward></IoChevronForward>
            </button>
          </div>
          <SwiperComponent
            loop={true}
            thumbs={{ swiper: thumbsSwiper.current }}
            spaceBetween={10}
            modules={[Navigation, Pagination, FreeMode, Thumbs]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            pagination={true}
            className="room-swiper bg-white rounded-md overflow-hidden"
          >
            {room &&
              room?.roomImages?.length > 0 &&
              room?.roomImages.map((roomImage) => (
                <SwiperSlide>
                  <img src={roomImage} alt="" />
                </SwiperSlide>
              ))}
            {isLoading &&
              Array(4)
                .fill("img")
                .map(() => (
                  <SwiperSlide>
                    <div className="">Hi</div>
                  </SwiperSlide>
                ))}
          </SwiperComponent>
          <SwiperComponent
            onSwiper={(swiper) => (thumbsSwiper.current = swiper)}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="thumbSwiper mt-4"
          >
            {room &&
              room?.roomImages?.length > 0 &&
              room?.roomImages.map((roomImage) => (
                <SwiperSlide>
                  <img
                    src={roomImage}
                    alt=""
                    className="h-fit hover:opacity-75 transition-all rounded-sm overflow-hidden"
                  />
                </SwiperSlide>
              ))}
            {isLoading &&
              Array(4)
                .fill("img")
                .map(() => (
                  <SwiperSlide>
                    <div className="">
                      <Skeleton.Avatar
                        active={true}
                        size={"large"}
                        style={{
                          height: "100%",
                          width: "100%",
                        }}
                        shape={"square"}
                      />
                    </div>
                  </SwiperSlide>
                ))}
          </SwiperComponent>
        </div>

        <div className="flex flex-col gap-6">
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
                <CardFooter>
                  <Link
                    className="mt-6 w-full"
                    to={`/create-booking/${room._id}`}
                  >
                    <Button className="rounded-sm w-full">Book Now</Button>
                  </Link>
                </CardFooter>
              </>
            )}

            {isLoading && (
              <CardContent className="p-6">
                <Skeleton paragraph round></Skeleton>
              </CardContent>
            )}
          </Card>

          <div className="">
            <h1 className="font-bold text-2xl text-slate-800">
              You May Also Like
            </h1>
            <div className="flex gap-6 mt-4">
              {suggestedRooms &&
                suggestedRooms.data.map((room: TRoom) => (
                  <RoomCard size="sm" room={room}></RoomCard>
                ))}
              {sLoading &&
                Array(2).map(() => <Skeleton active={true} avatar></Skeleton>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetails;
