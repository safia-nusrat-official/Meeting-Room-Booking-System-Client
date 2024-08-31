import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  TQueryArgs,
  useGetAllAvailableRoomsQuery,
} from "@/redux/api/rooms.api";
import { useGetSlotsOfARoomQuery } from "@/redux/api/slots.api";
import { TSlot } from "@/types/slot.types";
import { Card, Skeleton } from "antd";
import moment from "moment";
import { GoClock } from "react-icons/go";

const AvailableSlots = ({
  id,
  propDate,
  setSlots,
  slots,
  setDate,
}: {
  id: string;
  propDate: Date | null;
  setSlots: React.Dispatch<React.SetStateAction<string[]>>;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  slots: string[];
}) => {
  console.log("The date that slots received", propDate)

  const date = propDate ? moment(propDate).format("YYYY-MM-DD") : null;
  console.log("The date that slots made", date)

  const args = [
    {
      key: "date",
      value: date ? `${date}` : "",
    },
    {
      key: "groupBy",
      value: date ? "" : "rooms",
    },
  ];

  const { data, isLoading } = useGetSlotsOfARoomQuery({
    id,
    isBooked: false,
    args,
  });
  const slotData: TSlot[] = data && data?.data;

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <GoClock className="text-xl"></GoClock>
          <label className="font-medium">
            Available Time Slots
            {date && ` For ${moment(date, "YYYY:MM:DD").format("Do MMM YYYY")}`}
          </label>
        </div>
        {
          <div className="flex flex-wrap gap-2">
            {date &&
              slotData &&
              slotData.length > 0 &&
              slotData.map((slot) => (
                <SlotCard
                  date={date}
                  slots={slots}
                  setSlots={setSlots}
                  slot={slot}
                ></SlotCard>
              ))}

            {!date &&
              slotData &&
              slotData.length > 0 &&
              slotData.map((item: any) => (
                <button
                  className="flex flex-col p-2 rounded-md border-[1px] border-slate-300 bg-popover hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setDate(moment(item.date, "YYYY-MM-DD").toDate())}
                >
                  <div className="flex flex-col">
                    <span className="text-slate-500 text-xs">
                      Total {item?.slots?.length} slot
                      {item?.slots?.length > 1 && "s"} available on
                    </span>
                    <span className="text-md font-medium">
                      {moment(item.date, "YYYY:MM:DD").format("Do MMM YYYY")}
                    </span>
                  </div>
                </button>
              ))}

            {!isLoading &&
              Array(4).map(() => (
                <Skeleton.Button
                  active
                  style={{
                    width: 145,
                    height: 145,
                  }}
                ></Skeleton.Button>
              ))}
            {slotData && slotData.length < 1 && (
              <div className="border-[1px] flex flex-col gap-8 col-span-2 p-8 border-slate-300 rounded-sm">
                No Slot Available on {moment(date).format("DD MMM")}
                <Button variant="link" onClick={() => setDate(null)}>
                  See on available dates?
                </Button>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default AvailableSlots;

const SlotCard = ({
  slot,
  slots,
  setSlots,
  date,
}: {
  slot: TSlot;
  setSlots: React.Dispatch<React.SetStateAction<string[]>>;
  slots: string[];
  date: string;
}) => {
  const { endTime, room, startTime, _id } = slot;

  return (
    <label
      key={_id}
      className="flex flex-col  p-2 font-medium items-center justify-between rounded-md border-[1px] border-slate-200 bg-popover hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primaryColor [&:has([data-state=checked])]:bg-blue-50 [&:has([data-state=checked])]:text-primaryColor"
    >
      <Checkbox
        style={{
          opacity: "0",
          height: "3px",
        }}
        onCheckedChange={(checked) => {
          checked
            ? setSlots([...slots, slot._id as string])
            : setSlots([
                ...slots.filter((item) => item !== (slot._id as string)),
              ]);
        }}
      />

      <div className="flex flex-col">
        <span className="">
          {moment(slot.date, "YYYY:MM:DD").format("Do MMM YYYY")}
        </span>
        <span className="text-slate-500 font-normal">
          {moment(startTime, "HH:mm").format("hh:mm A")} -{" "}
          {moment(endTime, "HH:mm").format("hh:mm A")}
        </span>
      </div>
    </label>
  );
};
