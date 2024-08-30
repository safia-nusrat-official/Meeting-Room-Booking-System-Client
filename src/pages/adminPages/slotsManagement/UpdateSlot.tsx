import CustomForm from "@/components/shared/form/CustomForm";
import FormDate from "@/components/shared/form/FormDate";
import FormSelect from "@/components/shared/form/FormSelect";
import FormTimePicker from "@/components/shared/form/FormTimePicker";
import {
  useGetAllAvailableRoomsQuery,
} from "@/redux/api/rooms.api";
import { useGetSingleSlotQuery, useUpdateSlotMutation } from "@/redux/api/slots.api";
import { TReduxResponse } from "@/types";
import { TRoom } from "@/types/room.types";
import { TSlot } from "@/types/slot.types";
import { Button, ConfigProvider, Modal, SelectProps } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { SlPencil } from "react-icons/sl";
import { toast } from "sonner";

const UpdateSlot = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const { data:rooms, isLoading:rLoading } = useGetAllAvailableRoomsQuery([{
    key:"limit", value:"all"
  }], {
    skip: !open,
  });

  const { data, isLoading, refetch } = useGetSingleSlotQuery(id, {
    skip: !open,
  });

  const slotData: TSlot = (!isLoading && data?.data) || null;

  const [updateSlot, { isLoading: UpdateLoading, isSuccess, isError }] =
    useUpdateSlotMutation();

  const showModal = () => {
    setOpen(true);
  };

  const handleUpdate: SubmitHandler<FieldValues> = async (data: any) => {
    const slot: TSlot = {...data};

    console.log(slot);
    try {
      const res = (await updateSlot({ id, slot })) as TReduxResponse<any>;
      console.log(res);
      if (res.error) {
        console.log(res.error?.message);
        toast.error(res.error?.message || res.error?.data.message);
      } else {
        console.log(res.data);
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
      <Button type="primary" onClick={showModal}>
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
              <FormSelect
                options={roomOptions}
                label="Room No."
                name="room"
                loading={rLoading}
              ></FormSelect>
            </div>
            <div className="md:col-span-1">
              <FormDate label="Date" name="date"></FormDate>
            </div>
            <div className="md:col-span-1">
              <FormTimePicker
                label="Start Time"
                name="startTime"
              ></FormTimePicker>
            </div>
            <div className="md:col-span-1">
              <FormTimePicker label="End Time" name="endTime"></FormTimePicker>
            </div>
          </div>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className="mt-8"
          >
            Create Slot
          </Button>
        </ConfigProvider>
      </CustomForm>
      </Modal>
    </>
  );
};

export default UpdateSlot;
