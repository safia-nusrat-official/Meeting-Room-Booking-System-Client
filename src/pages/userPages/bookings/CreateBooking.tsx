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
import { Link, useParams } from "react-router-dom";
import { RoomCard } from "@/pages/rooms/RoomCard";
import CustomForm from "@/components/shared/form/CustomForm";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "@/components/shared/form/FormInput";
import { useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/features/authSlice";
import { TUser } from "@/types/user.types";
import { Col, Row, Spin } from "antd";
import AvailableSlots from "../AvailableSlots";
import FormDateWatch from "@/components/shared/form/FormDateWatch";
import { TBooking } from "@/types/booking.types";
import moment from "moment";
import { useCreateBookingMutation } from "@/redux/api/bookings.api";
import { toast } from "sonner";
import { TReduxResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

const CreateBooking = () => {
  const { id } = useParams();
  const { data: room } = useGetSingleRoomQuery(id as string);
  const user = useAppSelector(getUser) as TUser;
  const [createBooking, { isLoading }] = useCreateBookingMutation();
  const [date, setDate] = useState<Date>(new Date());
  const [slots, setSlots] = useState<string[]>([]);

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const booking: TBooking = {
      date: moment().format("YYYY-MM-DD"),
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
      } else {
        console.log(result.data);
        toast.success(result.data?.message || "Successfully Booked Room!");
      }
    } catch (error) {
      console.log(error);
    }
  };
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

            {/* <FormDateWatch
              setValue={setDate}
              label="Pick a Date"
              name="date"
            ></FormDateWatch> */}

            <div className="grid md:grid-cols-2 grid-cols-1 mb-8 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-medium">Pick a Date</label>

                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(day: Date | undefined) => day && setDate(day)}
                  className="rounded-sm border"
                />
              </div>

              <AvailableSlots
                setSlots={setSlots}
                slots={slots}
                date={moment(date).format("YYYY-MM-DD")}
                id={id as string}
                setDate={setDate}
              ></AvailableSlots>
            </div>
            <Spin spinning={isLoading} fullscreen></Spin>
            <Button className="w-full" type="submit">
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
