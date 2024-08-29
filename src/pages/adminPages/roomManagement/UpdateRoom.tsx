import CustomForm from "@/components/shared/form/CustomForm";
import FormInput from "@/components/shared/form/FormInput";
import FormSelect from "@/components/shared/form/FormSelect";
import FormUpload from "@/components/shared/form/FormUpload";
import { AmenitiesSelectOptions } from "@/const/rooms.const";
import {
  useGetSingleRoomQuery,
  useUpdateRoomMutation,
} from "@/redux/api/rooms.api";
import { TReduxResponse } from "@/types";
import { TRoom } from "@/types/room.types";
import { handleNonPrimitiveUpdates } from "@/utility/roomUtils/updateRooms.utils";
import { Button, ConfigProvider, Modal } from "antd";
import React, { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { SlPencil } from "react-icons/sl";
import { toast } from "sonner";

const UpdateRoom = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetSingleRoomQuery(id, {
    skip: !open,
  });
  const roomData: TRoom = (!isLoading && data?.data) || null;

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [updateRoom, { isLoading: UpdateLoading, isSuccess, isError }] =
    useUpdateRoomMutation();

  const showModal = () => {
    setOpen(true);
  };

  const handleUpdate: SubmitHandler<FieldValues> = async (updatedData: any) => {
    console.log("new", imageUrls);
    console.log("new", updatedData);
    console.log("old", roomData);
    // the added items are the ones who are not in the old array but is included in the new updated array

    const updatedAmenities = handleNonPrimitiveUpdates(
      roomData?.amenities,
      updatedData.amenities as string[]
    );
    const updatedImages = handleNonPrimitiveUpdates(
      roomData?.roomImages,
      imageUrls
    );
    console.log("Updated amenities", updatedAmenities);

    const room: TRoom = {
      roomImages: updatedImages,
      amenities: updatedAmenities || roomData?.amenities,
      capacity: Number(updatedData.capacity || roomData?.capacity),
      name: updatedData.name || roomData?.name,
      floorNo: Number(updatedData.floorNo || roomData?.floorNo),
      roomNo: Number(updatedData.roomNo || roomData?.roomNo),
      pricePerSlot: Number(updatedData.pricePerSlot || roomData?.pricePerSlot),
    };

    console.log(room);
    try {
      const res = (await updateRoom({ id, room })) as TReduxResponse<any>;
      console.log(res);
      if (res.error) {
        console.log(res.error?.message);
        toast.error(res.error?.message || res.error?.data.message);
      } else {
        console.log(res.data);
        toast.success("Room Data Updated Successfully");
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const defaultFileList =
    roomData?.roomImages?.length > 0
      ? roomData.roomImages.map((img, index) => ({
          name: `image-${index + 1}`,
          url: img,
          uid: `${roomData._id}${index + 1}`,
        }))
      : [];

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
        title="Update Room Details"
        open={open}
        footer={null}
        confirmLoading={UpdateLoading}
      >
        <CustomForm resetForm={false} onSubmit={handleUpdate}>
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
            <div className="grid grid-cols-3 md:gap-2">
              <div className="md:col-span-2">
                <FormInput
                  label="Room Name"
                  defaultValue={roomData?.name}
                  name="name"
                  required={false}
                ></FormInput>
              </div>
              <div className="md:col-span-1">
                <FormInput
                  type="number"
                  label="Room No"
                  name="roomNo"
                  required={false}
                  defaultValue={roomData?.roomNo}
                ></FormInput>
              </div>
              <div className="md:col-span-1">
                <FormInput
                  type="number"
                  label="Capacity"
                  name="capacity"
                  required={false}
                  defaultValue={roomData?.capacity}
                ></FormInput>
              </div>
              <div className="md:col-span-1">
                <FormInput
                  type="number"
                  label="Price Per Slot"
                  required={false}
                  name="pricePerSlot"
                  defaultValue={roomData?.pricePerSlot}
                ></FormInput>
              </div>
              <div className="md:col-span-1">
                <FormInput
                  type="number"
                  label="Floor No"
                  name="floorNo"
                  required={false}
                  defaultValue={roomData?.floorNo}
                ></FormInput>
              </div>
              <div className="md:col-span-3">
                <FormSelect
                  placeholder="Select multiple amenities"
                  label="Add Amenities"
                  name="amenities"
                  required={false}
                  options={AmenitiesSelectOptions}
                  defaultValue={roomData?.amenities}
                ></FormSelect>
              </div>
              <div className="md:col-span-3 flex gap-2">
                <FormUpload
                  required={false}
                  name="roomImages"
                  label="Room Images"
                  isSuccess={isSuccess}
                  isError={isError}
                  imgUrl={imageUrls}
                  setImageUrl={setImageUrls}
                  defaultFileList={defaultFileList}
                ></FormUpload>
              </div>
            </div>
            <Button
              loading={UpdateLoading}
              htmlType="submit"
              className="mt-8"
              type="primary"
            >
              Update Room
            </Button>
          </ConfigProvider>
        </CustomForm>
      </Modal>
    </>
  );
};

export default UpdateRoom;
