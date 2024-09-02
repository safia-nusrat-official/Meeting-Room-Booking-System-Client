import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SectionHeading from "@/components/shared/SectionHeading";
import { useGetSingleRoomQuery } from "@/redux/api/rooms.api";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoomCard } from "@/pages/rooms/RoomCard";
import CustomForm from "@/components/shared/form/CustomForm";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "@/components/shared/form/FormInput";
import { useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/features/authSlice";
import { TUser } from "@/types/user.types";
import { Col, Row, Spin } from "antd";
import AvailableSlots from "../AvailableSlots";
import { TBooking } from "@/types/booking.types";
import moment from "moment";
import { useCreateBookingMutation } from "@/redux/api/bookings.api";
import { toast } from "sonner";
import { TReduxResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CiCalendar } from "react-icons/ci";

const CreateBooking = () => {
  const { id } = useParams();
  const { data: room, refetch } = useGetSingleRoomQuery(id as string);
  const user = useAppSelector(getUser) as TUser;
  const [createBooking, { isLoading }] = useCreateBookingMutation();

  const navigate = useNavigate();
  const [date, setDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<string[]>([]);

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!date || slots.length < 1) {
      return;
    }
    console.log(data);
    const booking: TBooking = {
      date: moment(date).format("YYYY-MM-DD"),
      room: id as string,
      user: user._id as string,
      slots,
    };
    try {
      const result = (await createBooking(booking)) as TReduxResponse<any>;
      if (result.error) {
        console.log(result.error);
        toast.error(
          result.error?.data?.message ||
            result.error?.message ||
            "Failed to book room"
        );
        refetch();
      } else {
        console.log(result.data);
        toast.success(result.data?.message || "Successfully Booked Room!");
        refetch();
        navigate("/user/my-bookings");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(date);
  return (
    <div className="md:p-12 bg-white relative">
      <div className="md:m-0 m-8 mb-0">
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
                <Link to="/rooms">Rooms</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/my-bookings">Booking</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <SectionHeading mode="dark">Book Rooms</SectionHeading>
      </div>
      <div className="flex items-start md:flex-row-reverse flex-col-reverse gap-8">
        <div className="md:m-0 mx-8 flex-1">
          <CustomForm onSubmit={handleSubmit}>
            <h1 className="font-bold text-slate-800  my-4 text-xl">
              User Details
            </h1>
            <Row gutter={8}>
              <Col
                lg={{
                  span: 12,
                }}
                sm={{
                  span: 24,
                }}
              >
                <FormInput
                  label="Your Name"
                  name="user"
                  type="text"
                  defaultValue={user.name}
                ></FormInput>
              </Col>
              <Col
                lg={{
                  span: 12,
                }}
                sm={{
                  span: 24,
                }}
              >
                <FormInput
                  label="Your Email"
                  name="email"
                  type="text"
                  defaultValue={user.email}
                ></FormInput>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col
                lg={{
                  span: 12,
                }}
                sm={{
                  span: 24,
                }}
              >
                <FormInput
                  type="text"
                  label="Phone"
                  name="phone"
                  defaultValue={user.phone}
                ></FormInput>
              </Col>
              <Col
                lg={{
                  span: 12,
                }}
                sm={{
                  span: 24,
                }}
              >
                <FormInput
                  type="text"
                  label="Addresults"
                  name="address"
                  defaultValue={user.address}
                ></FormInput>
              </Col>
            </Row>

            <h1 className="font-bold text-slate-800 my-4 text-xl">
              Booking Details
            </h1>
            <div className="flex flex-col mb-8 gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <CiCalendar className="text-xl"></CiCalendar>
                  <label className="font-medium">Pick a Date</label>
                </div>
                <Calendar
                  required
                  mode="single"
                  month={date||undefined}
                  selected={date || undefined}
                  onSelect={(day: Date | undefined) => {
                    console.log("Selected date", day);
                    day && setDate(day);
                  }}
                  className="rounded-sm border w-full flex justify-center mb-4"
                />
              </div>

              <AvailableSlots
                setSlots={setSlots}
                slots={slots}
                propDate={date}
                id={id as string}
                setDate={setDate}
              ></AvailableSlots>
            </div>
            <Spin spinning={isLoading} fullscreen></Spin>

            <Button
              disabled={!date || slots.length < 1}
              className="w-full"
              type="submit"
            >
              Confirm Booking
            </Button>
          </CustomForm>
        </div>
        <div className="flex-1 relative md:sticky top-0 md:top-12">
          {room && <RoomCard size="lg" room={room?.data}></RoomCard>}
        </div>
      </div>
    </div>
  );
};

export default CreateBooking;
