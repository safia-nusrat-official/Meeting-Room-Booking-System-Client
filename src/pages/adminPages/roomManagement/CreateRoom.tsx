import CustomForm from "@/components/shared/form/CustomForm";
import FormInput from "@/components/shared/form/FormInput";
import FormSelect from "@/components/shared/form/FormSelect";
import FormUpload from "@/components/shared/form/FormUpload";
import SectionHeading from "@/components/shared/SectionHeading";
import { AmenitiesSelectOptions } from "@/const/rooms.const";
import { useCreateRoomMutation } from "@/redux/api/rooms.api";
import { TReduxResponse } from "@/types";
import { TRoom } from "@/types/room.types";
import { Button, Col, ConfigProvider, Row, UploadFile } from "antd";
import React, { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { IoChevronBackOutline, IoClose } from "react-icons/io5";
import { TfiClose } from "react-icons/tfi";
import { Link } from "react-router-dom";

const CreateRoom = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [createRoom, { isLoading }] = useCreateRoomMutation();
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(
      data.roomImages.fileList.map((file: any) => file?.response?.data?.url)
    );

    const room: TRoom = {
      roomImages:
        data.roomImages.fileList.map(
          (file: any) => file?.response?.data?.url
        ) || imageUrls,
      amenities: data.amenities,
      capacity: Number(data.capacity),
      name: data.name,
      floorNo: Number(data.floorNo),
      roomNo: Number(data.roomNo),
      pricePerSlot: Number(data.pricePerSlot),
      isDeleted: false,
    };
    setImageUrls([]);
    try {
      const res = (await createRoom(room)) as TReduxResponse<any>;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8 bg-white">
      <div className="flex mb-8 justify-start">
        <Link to="/admin/room-lists" className="text-4xl text-slate-500 mr-6">
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
              colorPrimaryBorderHover:"#020817"
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
            <div className="md:col-span-1">
              <FormSelect
                placeholder="Select multiple amenities"
                label="Add Amenities"
                name="amenities"
                options={AmenitiesSelectOptions}
              ></FormSelect>
            </div>
            <div className="md:col-span-1">
              <FormUpload
                required
                name="roomImages"
                label="Room Images"
                setImageUrl={setImageUrls}
              ></FormUpload>
              {imageUrls.length > 0 &&
                imageUrls.map((img) => (
                  <div className="relative border-slate-900 p-2 border-[1px] group">
                    <img src={img} alt="" className="w-28" />
                    <div className="overlay flex justify-center text-white items-center group-hover:bg-[#00000023] text-xl group-hover:backdrop-blur-[1px] transition-all absolute top-0 left-0 w-full h-full">
                      <button
                        className="group-hover:block hidden"
                        onClick={() => setImageUrls([])}
                      >
                        <TfiClose></TfiClose>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <Button loading={isLoading} htmlType="submit" className="mt-8">
            Create Room
          </Button>
        </ConfigProvider>
      </CustomForm>
    </div>
  );
};

export default CreateRoom;
