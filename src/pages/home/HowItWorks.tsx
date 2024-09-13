import bookingAnimationData from "../../assets/animations/bookingAnimation.json";
import SectionHeading from "@/components/shared/SectionHeading";
import searchResultsAnimationData from "../../assets/animations/searchResultsAnimation.json";
import calendarClockAnimationData from "../../assets/animations/calendarClockAnimation.json";
import LottieAnimation from "@/lib/LottieAnimation";

const HowItWorks = () => {
  return (
    <section className="selection:bg-secondaryColor bg-white md:px-20 md:py-12 p-8 overflow-hidden">
      <SectionHeading animateFrom="left" mode="dark" center>
        How it works
      </SectionHeading>
      <p
        data-aos="zoom-out"
        className="mt-4 mb-8 mx-auto text-center text-bodyText font-medium"
      >
        Navigate Your Booking with Ease: How It Works
      </p>
      <div className="grid md:grid-cols-3 grid-cols-1 mt-8 text-primaryColor gap-8">
        <div
          className="flex flex-col w-64"
          data-aos="fade-up"
        >
          <LottieAnimation
            height={220}
            width={300}
            animationData={searchResultsAnimationData}
          ></LottieAnimation>
          <span className="font-semibold">Step 1: Search for a Room</span>
          <p className="text-bodyText">
            Enter your desired room specifications, such as capacity and
            equipment needed, into the search bar. Our system will display a
            list of available rooms that match your criteria, making it simple
            to choose the perfect space for your event
          </p>
        </div>
        <div className="flex flex-col self-center w-64" data-aos="fade-up">
          <LottieAnimation
            height={200}
            animationData={calendarClockAnimationData}
          ></LottieAnimation>

          <span className="mt-4 my-2 font-semibold">
            Step 2: Select Your Time Slot
          </span>
          <p className="text-bodyText">
            Once you’ve found your ideal room, select the time slot that works
            best for your meeting. Our calendar view allows you to see available
            time slots and choose the one that suits your schedule. You can
            easily check for conflicts and select a time that fits your needs
          </p>
        </div>
        <div className="flex self-center flex-col w-64" data-aos="fade-up">
        <LottieAnimation
            height={200}
            animationData={bookingAnimationData}
          ></LottieAnimation>
          <span className="mt-4 my-2 font-semibold">
            Step 3: Book and Confirm
          </span>
          <p className="text-bodyText">
            Finalize your booking by providing a few details and confirming your
            reservation. Enter any additional requirements or special requests
            in the booking form. Once you review and confirm your booking, you
            will receive a confirmation email with all the details of your
            reservation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
