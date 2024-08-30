import SectionHeading from "@/components/shared/SectionHeading";
import React, { useEffect, useState } from "react";
import sectionBg from "../../assets/images/loginBg.jpg";
import { useGetAllAvailableRoomsQuery } from "@/redux/api/rooms.api";
import { TRoom } from "@/types/room.types";
import { RoomCard } from "../rooms/RoomCard";
import { Button } from "antd";
import { Link } from "react-router-dom";

const FeaturedRooms = () => {
  const { data, isLoading } = useGetAllAvailableRoomsQuery([
    { key: "limit", value: "8" },
  ]);
  const roomData = (!isLoading && data?.data && data.data) || [];

  console.log(data);
  return (
    <section
      className="bg-fixed relative bg-no-repeat bg-cover"
      style={{ backgroundImage: `url("${sectionBg}")` }}
    >
      <div className="section-overlay absolute bg-[#0000005c] backdrop-blur-sm top-0 left-0 w-full h-full"></div>
      <div className="section-contents md:p-12 relative">
        <SectionHeading mode="light" center>
          FeaturedRooms
        </SectionHeading>
        <p className="mt-2 max-w-96 text-center mx-auto text-[#ffffffc6]">
          Explore Our Top Picks for Premium Meeting Spaces
        </p>

        <div className="grid relative mt-8 grid-cols-4 gap-4">
          {roomData.map((room: TRoom) => (
            <RoomCard room={room} key={room._id}></RoomCard>
          ))}
        </div>

        <div className="absolute w-full bottom-0 left-0 h-1/3 bg-gradient-to-t from-white to-transparent md:pb-20 flex items-end justify-center">
        <Link to="/rooms">
        <Button className="md:scale-125 text-slate-900 px-12 rounded-sm">See More</Button></Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
