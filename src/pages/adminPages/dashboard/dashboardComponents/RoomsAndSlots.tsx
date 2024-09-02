import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetAllAvailableRoomsQuery } from "@/redux/api/rooms.api";
import { TRoom } from "@/types/room.types";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { QuickAccess } from "./QuickAccess";
import { useGetSlotsOfARoomQuery } from "@/redux/api/slots.api";
import moment from "moment";
import { TSlot } from "@/types/slot.types";

export function RoomsAndSlots() {
  const [room, setRoom] = useState<TRoom | null>(null);
  const [slots, setSlots] = useState<TSlot[]>([]);

  const { data: roomData, isLoading } = useGetAllAvailableRoomsQuery([
    { key: "limit", value: "1" },
  ]);
  const { data: slotData } = useGetSlotsOfARoomQuery(
    {
      id: room?._id as string,
      args: [{ key: "groupBy", value: "" }],
    },
    {
      skip: !room,
    }
  );

  console.log(roomData, slotData);

  useEffect(() => {
    roomData && setRoom(roomData?.data[0])
    slotData && slotData.data.length && setSlots(slotData.data)
  }, [roomData, slotData]);

  return (
    <Card className="shadow-none flex overflow-hidden justify-between items-center gap-4  col-span-8 p-4 rounded-sm">
      <CardHeader className="p-0">
        <QuickAccess></QuickAccess>
      </CardHeader>
      <CardContent className="flex gap-4 p-0 w-fit">
        {room && (
          <Link
            to={`/rooms/${room?._id}`}
            className="flex gap-2 text-left border-[1px] bg-slate-100 rounded-sm pr-2 font-medium"
          >
            <img src={room?.roomImages[0]} className="w-24 rounded-sm" />
            <div className="p-2">
              <p className="text-lg text-slate-900">{(room as TRoom)?.name}</p>

              <p className="text-slate-700 text-xs">
                Room No. {(room as TRoom)?.roomNo}
              </p>
              <p className="text-slate-700 text-xs">
                $ {(room as TRoom)?.pricePerSlot} per slot
              </p>
            </div>
          </Link>
        )}

        
        {/* {slots.map((item: TSlot) => (
            <button className="flex flex-col p-2 rounded-md border-[1px] bg-accent hover:text-accent-foreground">
              <div className="flex flex-col">
                <span className="text-slate-500 text-xs">
                  Total {slots.length} slot
                  {slots.length > 1 && "s"} available on
                </span>
                <span className="text-md font-medium">
                  {moment(item.date, "YYYY:MM:DD").format("Do MMM YYYY")}
                </span>
              </div>
            </button>
          ))} */}
      </CardContent>
    </Card>
  );
}
