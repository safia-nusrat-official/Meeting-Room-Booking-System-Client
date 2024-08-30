import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TQueryArgs } from "@/redux/api/rooms.api";
import { useGetSlotsOfARoomQuery } from "@/redux/api/slots.api";
import { TMeta } from "@/types";
import { TSlot } from "@/types/slot.types";
import { Card, Skeleton } from "antd";
import moment from "moment";
import { CiCalendar } from "react-icons/ci";

const AvailableSlots = ({
  id,
  date,
  setSlots,
  slots,
  setDate
}: {
  id: string;
  date: string;
  setSlots: React.Dispatch<React.SetStateAction<string[]>>;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  slots: string[];
}) => {
  const { data, isLoading } = useGetSlotsOfARoomQuery({
    id,
    isBooked: false,
    args: [
      {
        key: "date",
        value: `${date || ""}`,
      },
    ],
  });
  const slotData: TSlot[] = data && data?.data;

  return (
    <div>
      <div className="flex flex-col gap-2">
        <label>Available Time Slots</label>

        {
          <div className="grid grid-cols-2 gap-4">
            {date &&
              slotData &&
              slotData.map((slot) => (
                <SlotCard
                  slots={slots}
                  setSlots={setSlots}
                  slot={slot}
                ></SlotCard>
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
                <Button variant="link" onClick={()=>setDate(new Date())}>See on available dates?</Button>
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
}: {
  slot: TSlot;
  setSlots: React.Dispatch<React.SetStateAction<string[]>>;
  slots: string[];
}) => {
  const { date, endTime, room, startTime, _id } = slot;

  return (
    <label
      key={_id}
      className="flex flex-col items-center justify-between rounded-md border-[1px] border-slate-200 bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primaryColor [&:has([data-state=checked])]:bg-blue-50 [&:has([data-state=checked])]:text-primaryColor"
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
      <span>
        {moment(startTime, "HH:mm").format("hh:mm A")}
        <br></br> {moment(endTime, "HH:mm").format("hh:mm A")}
      </span>
    </label>
  );
};
