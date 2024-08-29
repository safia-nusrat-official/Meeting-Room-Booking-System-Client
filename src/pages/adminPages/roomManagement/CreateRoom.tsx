import CustomForm from "@/components/shared/form/CustomForm";
import FormInput from "@/components/shared/form/FormInput";
import FormSelect from "@/components/shared/form/FormSelect";
import FormUpload from "@/components/shared/form/FormUpload";
import SectionHeading from "@/components/shared/SectionHeading";
import { AmenitiesSelectOptions } from "@/const/rooms.const";
import { useCreateRoomMutation } from "@/redux/api/rooms.api";
import { TReduxResponse } from "@/types";
import { TRoom } from "@/types/room.types";
import { Button, ConfigProvider, Image } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const CreateRoom = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [createRoom, { isLoading, isSuccess, isError }] = useCreateRoomMutation();
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {

    const room: TRoom = {
      roomImages: imageUrls,
      amenities: data.amenities,
      capacity: Number(data.capacity),
      name: data.name,
      floorNo: Number(data.floorNo),
      roomNo: Number(data.roomNo),
      pricePerSlot: Number(data.pricePerSlot),
      isDeleted: false,
    };
    try {
      const res = (await createRoom(room)) as TReduxResponse<any>;
      console.log(res);
      setImageUrls([]);
      if(res.error){
        console.log(res.error)
        toast.error(res.error?.data.message||res.error?.message||"Failed to create room")
      }else{
        console.log(res.data)
        toast.error(res.data?.message||"Successfully Created Room")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8 bg-white">
      <div className="flex mb-8 justify-start">
        <Link to="/admin/rooms-list" className="text-4xl text-slate-500 mr-6">
          <IoChevronBackOutline></IoChevronBackOutline>
        </Link>
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
          <div className="grid grid-cols-3 md:gap-6">
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
                options={AmenitiesSelectOptions}
              ></FormSelect>
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
              {/* <ImgUploader></ImgUploader> */}
            </div>
          </div>
          <Button loading={isLoading} type="primary" htmlType="submit" className="mt-8">
            Create Room
          </Button>
        </ConfigProvider>
      </CustomForm>
    </div>
  );
};

export default CreateRoom;
