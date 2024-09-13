import CustomForm from "@/components/shared/form/CustomForm";
import FormDate from "@/components/shared/form/FormDate";
import FormSelect from "@/components/shared/form/FormSelect";
import FormTimePicker from "@/components/shared/form/FormTimePicker";
import { useGetAllAvailableRoomsQuery } from "@/redux/api/rooms.api";
import {
  useGetSingleSlotQuery,
  useUpdateSlotMutation,
} from "@/redux/api/slots.api";
import { TReduxResponse } from "@/types";
import { TRoom } from "@/types/room.types";
import { TSlot } from "@/types/slot.types";
import { Button, ConfigProvider, Modal, SelectProps } from "antd";
import moment from "moment";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { SlPencil } from "react-icons/sl";
import { toast } from "sonner";

const UpdateSlot = ({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean | undefined;
}) => {
  const [open, setOpen] = useState(false);
  const { data: rooms, isLoading: rLoading } = useGetAllAvailableRoomsQuery(
    [
      {
        key: "limit",
        value: "all",
      },
    ],
    {
      skip: !open,
    }
  );

  const { data, isLoading, refetch } = useGetSingleSlotQuery(id, {
    skip: !open,
  });

  const slotData: TSlot = data && data?.data;

  const [updateSlot, { isLoading: UpdateLoading }] =
    useUpdateSlotMutation();

  const showModal = () => {
    setOpen(true);
  };

  const handleUpdate: SubmitHandler<FieldValues> = async (data: any) => {

    const slot: TSlot = {
      date: data.date
        ? moment(data.date.$d).format("YYYY-MM-DD")
        : slotData.date,
      startTime: data.startTime
        ? moment(data.startTime.$d, "HH:mm").format("HH:mm")
        : slotData.startTime,
      endTime: data.endTime
        ? moment(data.endTime.$d, "HH:mm").format("HH:mm")
        : slotData.endTime,
      room: data.room ? data.room : slotData.room,
    };

    try {
      const res = (await updateSlot({ id, slot })) as TReduxResponse<any>;
      if (res.error) {
        console.log(res.error?.message);
        toast.error(res.error?.message || res.error?.data.message);
      } else {
        refetch();
        toast.success("Slot Data Updated Successfully");
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const roomOptions: SelectProps["options"] =
    rooms &&
    rooms.data.map((room: TRoom) => ({
      label: `${room.name} ( Room No. ${room.roomNo} )`,
      value: room._id as string,
    }));

  return (
    <>
      <Button
        type="primary"
        disabled={disabled}
        onClick={showModal}
        className="w-full"
      >
        Update
        <SlPencil className="text-md ml-2"></SlPencil>
      </Button>
      <Modal
        className="rounded-none"
        onCancel={() => setOpen(false)}
        loading={isLoading}
        title="Update Slot"
        open={open}
        footer={null}
        confirmLoading={UpdateLoading}
      >
        <CustomForm resetForm={true} onSubmit={handleUpdate}>
          <ConfigProvider
            theme={{
              token: {
                controlOutline: "transparent",
                borderRadius: 0,
                colorPrimaryBorderHover: "#020817",
              },
            }}
            input={{
              style: {
                color: "#020817",
              },
            }}
            button={{
              style: {
                color: "#fff",
                backgroundColor: "#020817",
              },
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
              <div className="md:col-span-1">
                {roomOptions && roomOptions.length > 0 && (
                  <FormSelect
                    defaultValue={
                      [
                        roomOptions.filter(
                          (option: any) => slotData?.room === option?.value
                        )[0]?.value as string,
                      ] || undefined
                    }
                    options={roomOptions}
                    label="Room"
                    required={false}
                    name="room"
                    loading={rLoading}
                  ></FormSelect>
                )}
              </div>
              <div className="md:col-span-1">
                {slotData && (
                  <FormDate
                    defaultValue={moment(slotData?.date, "YYYY-MM-DD")}
                    label="Date"
                    name="date"
                    required={false}
                  ></FormDate>
                )}
              </div>
              <div className="md:col-span-1">
                {slotData && (
                  <FormTimePicker
                    label="Start Time"
                    name="startTime"
                    required={false}
                    clock="12hr"
                    defaultValue={moment(slotData.startTime, "HH:mm")}
                  ></FormTimePicker>
                )}
              </div>
              <div className="md:col-span-1">
                {slotData && (
                  <FormTimePicker
                    label="End Time"
                    clock="12hr"
                    name="endTime"
                    required={false}
                    defaultValue={moment(slotData.endTime, "HH:mm")}
                  ></FormTimePicker>
                )}
              </div>
            </div>
            <Button
              loading={isLoading || UpdateLoading}
              type="primary"
              htmlType="submit"
              className="mt-8"
            >
              Update Slot
            </Button>
          </ConfigProvider>
        </CustomForm>
      </Modal>
    </>
  );
};

export default UpdateSlot;
