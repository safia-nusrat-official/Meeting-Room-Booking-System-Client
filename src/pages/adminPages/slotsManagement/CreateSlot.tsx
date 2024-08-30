import CustomForm from "@/components/shared/form/CustomForm";
import FormInput from "@/components/shared/form/FormInput";
import FormSelect from "@/components/shared/form/FormSelect";
import FormTextArea from "@/components/shared/form/FormTextArea";
import FormUpload from "@/components/shared/form/FormUpload";
import SectionHeading from "@/components/shared/SectionHeading";
import { AmenitiesSelectOptions } from "@/const/rooms.const";
import { useGetAllAvailableRoomsQuery } from "@/redux/api/rooms.api";
import { useCreateSlotMutation } from "@/redux/api/slots.api";
import { TReduxResponse } from "@/types";
import { TRoom } from "@/types/room.types";
import { TSlot } from "@/types/slot.types";
import { Button, ConfigProvider, SelectProps } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import FormDate from "../../../components/shared/form/FormDate";
import FormTimePicker from "@/components/shared/form/FormTimePicker";
import moment from "moment";

const CreateSlot = () => {
  const [createSlot, { isLoading, isError }] =
    useCreateSlotMutation();
  const { data: rooms, isLoading: rLoading } = useGetAllAvailableRoomsQuery([
    { key: "limit", value: "all" },
  ]);

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const date = moment(data.date).format("YYYY-MM-DD");

    const slot: TSlot = {
      date,
      room: data.room,
      startTime: moment(data.startTime.$d).format("HH:mm"),
      endTime: moment(data.endTime.$d).format("HH:mm"),
      isBooked: false,
    };
    console.log(slot);

    try {
      const res = (await createSlot(slot)) as TReduxResponse<any>;
      console.log(res);
      if (res.error) {
        console.log(res.error);
        toast.error(
          res.error?.data?.message ||
            res.error?.message ||
            "Failed to create slot"
        );
      } else {
        console.log(res.data);
        toast.success(res.data?.message || "Successfully Created Slot");
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
    <div className="p-8 bg-white">
      <div className="flex mb-8 justify-start">
        <Link to="/admin/slots-list" className="text-4xl text-slate-500 mr-6">
          <IoChevronBackOutline></IoChevronBackOutline>
        </Link>
        <SectionHeading mode="dark">Create a Slot</SectionHeading>
      </div>
      <CustomForm resetForm={true} onSubmit={handleSubmit}>
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
    </div>
  );
};

export default CreateSlot;
