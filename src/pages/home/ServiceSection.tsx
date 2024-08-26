import SectionHeading from "@/components/shared/SectionHeading";
import bookingAnimationData from "../../assets/animations/bookingAnimation.json";
import calendarAnimationData from "../../assets/animations/calendarAnimation.json";
import bookingAvailableAnimationData from "../../assets/animations/bookingAvailableAnimation.json";
import customerSupportAnimationData from "../../assets/animations/customerSupportAnimation.json";

import LottieAnimation from "@/lib/LottieAnimation";
import { GoCheckbox } from "react-icons/go";
import CustomBtn from "@/components/shared/CustomBtn";
import { Button } from "@/components/ui/button";

const ServiceSection = () => {
  return (
    <section className="md:p-20 md:gap-8 overflow-hidden p-10 flex lg:flex-row md:flex-col flex-col justify-between">
      <SectionHeading
        mode="dark"
        text="Our Services"
        animateFrom="right"
        showIn={["md", "sm"]}
      ></SectionHeading>
      <div className="collage gap-4 md:gap-6 grid grid-cols-2 lg:grid-cols-2 md:grid-cols-4 font-bold">
        <div
          data-aos="zoom-out"
          className="p-6 flex flex-col items-center text-center justify-center col-span-1 row-span-1 aspect-square  bg-slate-200 text-primaryColor"
        >
          <LottieAnimation
            animationData={calendarAnimationData}
          ></LottieAnimation>
          <span className="md:text-sm text-xs">Real-Time Availability</span>
        </div>
        <div
          data-aos="zoom-out"
          className="p-4 flex flex-col items-center text-center justify-center  bg-slate-200 text-primaryColor"
        >
          <LottieAnimation
            animationData={bookingAnimationData}
          ></LottieAnimation>

          <span className="md:text-sm text-xs">
            Instant Booking Confirmation
          </span>
        </div>
        <div
          data-aos="zoom-out"
          className="p-4 col-span-1 row-span-1 flex flex-col items-center text-center justify-center aspect-square  bg-slate-200 text-primaryColor"
        >
          <LottieAnimation
            animationData={bookingAvailableAnimationData}
          ></LottieAnimation>
          <span className="md:text-sm text-xs">Flexible Scheduling:</span>
        </div>
        <div
          data-aos="zoom-out"
          className="p-4 flex flex-col items-center text-center justify-center aspect-square bg-slate-200 text-primaryColor"
        >
          <LottieAnimation
            animationData={customerSupportAnimationData}
          ></LottieAnimation>
          <span className="md:text-sm text-xs">24/7 Support System</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-col w-full lg:w-1/2">
        <SectionHeading
          text={"Our Services"}
          mode="dark"
          animateFrom="left"
          showIn={["lg"]}
        ></SectionHeading>
        <ul className="lg:flex flex md:grid md:grid-cols-2  md:mt-0 mt-6 lg:mt-0 flex-col gap-4">
          <li
            data-aos-offset="100"
            data-aos="fade-left"
            data-aos-animation-duration="10000"
            data-aos-easing="ease-in-out"
            data-aos-once="false"
            data-aos-delay="100"
            className="flex flex-col mt-4"
          >
            <div className="flex gap-2 items-center text-lg">
              <GoCheckbox className=""></GoCheckbox>
              <span className="font-medium">Real-Time Availability</span>
            </div>
            <p className="ml-6 text-body">
              Instantly check the availability of meeting rooms in real time to
              ensure you can book the space you need when you need it.
            </p>
          </li>
          <li
            data-aos-offset="100"
            data-aos="fade-left"
            data-aos-animation-duration="10000"
            data-aos-easing="ease-in-out"
            data-aos-once="false"
            data-aos-delay="100"
            className="flex flex-col"
          >
            <div className="flex gap-2 items-center text-lg">
              <GoCheckbox className=""></GoCheckbox>
              <span className="font-medium">Instant Booking Confirmation</span>
            </div>
            <p className="ml-6 text-body">
              Receive immediate confirmation of your booking, removing any
              uncertainty and allowing you to proceed with your meeting plans
              seamlessly.
            </p>
          </li>
          <li
            data-aos-offset="100"
            data-aos="fade-left"
            data-aos-animation-duration="10000"
            data-aos-easing="ease-in-out"
            data-aos-once="false"
            data-aos-delay="100"
            className="flex flex-col"
          >
            <div className="flex gap-2 items-center text-lg">
              <GoCheckbox className=""></GoCheckbox>
              <span className="font-medium">Flexible Scheduling</span>
            </div>
            <p className="ml-6 text-body">
              Adjust and manage your bookings with ease, offering flexibility to
              accommodate any changes in your schedule.
            </p>
          </li>
          <li
            data-aos-offset="100"
            data-aos="fade-left"
            data-aos-animation-duration="10000"
            data-aos-easing="ease-in-out"
            data-aos-once="false"
            data-aos-delay="100"
            className="flex flex-col"
          >
            <div className="flex gap-2 items-center text-lg">
              <GoCheckbox className=""></GoCheckbox>
              <span className="font-medium">24/7 Support System</span>
            </div>
            <p className="ml-6 text-body">
              Our dedicated support team is available around the clock to assist
              you with any questions or issues that may arise.
            </p>
          </li>
        </ul>
        <Button className="mt-12 text-white py-[1.5rem] hover:border-slate-800 hover:border-2 hover:bg-transparent font-bold hover:text-slate-800 bg-slate-800 rounded-none">
          See More
        </Button>
      </div>
    </section>
  );
};

export default ServiceSection;
