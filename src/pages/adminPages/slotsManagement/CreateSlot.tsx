import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CustomForm from "@/components/shared/form/CustomForm";
import FormSelect from "@/components/shared/form/FormSelect";
import SectionHeading from "@/components/shared/SectionHeading";
import { useGetAllAvailableRoomsQuery } from "@/redux/api/rooms.api";
import { useCreateSlotMutation } from "@/redux/api/slots.api";
import { TReduxResponse } from "@/types";
import { TRoom } from "@/types/room.types";
import { TSlot } from "@/types/slot.types";
import { Button, ConfigProvider, SelectProps } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import FormDate from "../../../components/shared/form/FormDate";
import FormTimePicker from "@/components/shared/form/FormTimePicker";
import moment from "moment";

const CreateSlot = () => {
  const [createSlot, { isLoading }] = useCreateSlotMutation();
  const { data: rooms, isLoading: rLoading } = useGetAllAvailableRoomsQuery([
    { key: "limit", value: "all" },
  ]);

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const date = moment(data.date.$d).format("YYYY-MM-DD");

    const slot: TSlot = {
      date,
      room: data.room,
      startTime: moment(data.startTime.$d, "hh:mm").format("HH:mm"),
      endTime: moment(data.endTime.$d, "hh:mm").format("HH:mm"),
      isBooked: false,
    };

    try {
      const res = (await createSlot(slot)) as TReduxResponse<any>;

      if (res.error) {
        console.log(res.error);
        toast.error(
          res.error?.data?.message ||
            res.error?.message ||
            "Failed to create slot"
        );
      } else {
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
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/admin/slots-list">Slots</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/admin/create-slot">Create Slot</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex mt-2 mb-4 justify-start">
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
                disabled={rLoading}
                required
                loading={rLoading}
              ></FormSelect>
            </div>
            <div className="md:col-span-1">
              <FormDate required label="Date" name="date"></FormDate>
            </div>
            <div className="md:col-span-1">
              <FormTimePicker
                clock="12hr"
                required
                label="Start Time"
                name="startTime"
              ></FormTimePicker>
            </div>
            <div className="md:col-span-1">
              <FormTimePicker
                clock="12hr"
                label="End Time"
                name="endTime"
              ></FormTimePicker>
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
