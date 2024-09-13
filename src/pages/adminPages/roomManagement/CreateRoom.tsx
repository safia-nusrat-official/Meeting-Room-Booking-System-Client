import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CustomForm from "@/components/shared/form/CustomForm";
import FormInput from "@/components/shared/form/FormInput";
import FormSelect from "@/components/shared/form/FormSelect";
import FormTextArea from "@/components/shared/form/FormTextArea";
import FormUpload from "@/components/shared/form/FormUpload";
import SectionHeading from "@/components/shared/SectionHeading";
import { AmenitiesSelectOptions } from "@/const/rooms.const";
import { useCreateRoomMutation } from "@/redux/api/rooms.api";
import { TReduxResponse } from "@/types";
import { TRoom } from "@/types/room.types";
import { Button, ConfigProvider } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const CreateRoom = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [createRoom, { isLoading, isSuccess, isError }] =
    useCreateRoomMutation();
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const room: TRoom = {
      roomImages: imageUrls,
      amenities: data.amenities,
      capacity: Number(data.capacity),
      name: data.name,
      floorNo: Number(data.floorNo),
      description: data.description,
      rating: Number(data.rating),
      roomNo: Number(data.roomNo),
      pricePerSlot: Number(data.pricePerSlot),
      isDeleted: false,
    };
    try {
      const res = (await createRoom(room)) as TReduxResponse<any>;
      setImageUrls([]);
      if (res.error) {
        console.log(res.error);
        toast.error(
          res.error?.data.message ||
            res.error?.message ||
            "Failed to create room"
        );
      } else {
        console.log(res.data);
        toast.success(res.data?.message || "Successfully Created Room");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 md:p-8 bg-white">
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
              <Link to="/admin/rooms-list">Rooms</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/admin/create-room">Create Room</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex mt-2 mb-4 justify-start">
        <SectionHeading mode="dark">Create a Room</SectionHeading>
      </div>
      <CustomForm onSubmit={handleSubmit}>
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
          <div className="grid md:grid-cols-3 grid-cols-1 md:gap-6">
            <div className="md:col-span-2">
              <FormInput label="Room Name" name="name"></FormInput>
            </div>
            <div className="md:col-span-1">
              <FormInput
                type="number"
                label="Room No"
                name="roomNo"
              ></FormInput>
            </div>
            <div className="md:col-span-2">
              <FormTextArea
                label="Room Description"
                name="description"
              ></FormTextArea>
            </div>
            <div className="md:col-span-1 flex gap-2">
              <FormUpload
                required
                name="roomImages"
                label="Room Images"
                isSuccess={isSuccess}
                isError={isError}
                imgUrl={imageUrls}
                setImageUrl={setImageUrls}
              ></FormUpload>
            </div>
            <div className="md:col-span-1">
              <FormInput
                type="number"
                label="Capacity"
                name="capacity"
              ></FormInput>
            </div>
            <div className="md:col-span-1">
              <FormInput
                type="number"
                label="Price Per Slot"
                name="pricePerSlot"
              ></FormInput>
            </div>
            <div className="md:col-span-1">
              <FormInput
                type="number"
                label="Floor No"
                name="floorNo"
              ></FormInput>
            </div>
            <div className="md:col-span-2">
              <FormSelect
                placeholder="Select multiple amenities"
                label="Add Amenities"
                name="amenities"
                mode={"multiple"}
                options={AmenitiesSelectOptions}
              ></FormSelect>
            </div>
            <div className="md:col-span-1">
              <FormInput
                step={0.1}
                type="number"
                label="Rating"
                name="rating"
              ></FormInput>
            </div>
          </div>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className="mt-8"
          >
            Create Room
          </Button>
        </ConfigProvider>
      </CustomForm>
    </div>
  );
};

export default CreateRoom;
