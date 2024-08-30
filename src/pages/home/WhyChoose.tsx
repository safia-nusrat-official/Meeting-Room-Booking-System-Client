import SectionHeading from "@/components/shared/SectionHeading";
import booking from "../../assets/icons/booking.png";
import realTime from "../../assets/icons/realTime.png";
import secureTransaction from "../../assets/icons/secureTransaction.png";
import dashboard from "../../assets/icons/dashboard.png";

const WhyChoose = () => {
  return (
    <section className="selection:bg-secondaryColor bg-white md:px-20 md:py-12 p-8 overflow-hidden">
      <SectionHeading animateFrom="left" mode="dark" center>
        Why Choose Us
      </SectionHeading>
      <p data-aos="zoom-out"  className="mt-4 mb-8 mx-auto text-center text-bodyText font-medium">Empowering Your Meetings with Seamless Efficiency</p>
      <div className="grid mt-8 text-primaryColor grid-cols-4 gap-8">
        <div className="flex flex-col" data-aos="fade-up">
          <img width={50} src={booking} />
          <span className="mt-4 my-2 font-semibold">
            Seamless Booking Experience
          </span>
          <p className="text-bodyText">
            Simplify your meeting room reservations with our user-friendly
            interface. Book a room in just a few clicks and get instant
            confirmations.
          </p>
        </div>
        <div className="flex flex-col" data-aos="fade-up">
          <img width={50} src={dashboard} />
          <span className="mt-4 my-2 font-semibold">
          Flexible Room Management
          </span>
          <p className="text-bodyText"> Manage rooms effortlessly with our flexible admin controls. Create, update, or delete rooms and slots with ease, ensuring you always have the right space available.
          </p>
        </div>
        <div className="flex flex-col" data-aos="fade-up">
          <img width={50} src={secureTransaction} />
          <span className="mt-4 my-2 font-semibold">
          Secure Transaction
          </span>
          <p className="text-bodyText">Conduct transactions with confidence knowing that MeetWise employs the highest security standards to safeguard your financial information.
          </p>
        </div>
        <div className="flex flex-col" data-aos="fade-up">
          <img width={50} src={realTime} />
          <span className="mt-4 my-2 font-semibold">
          Real-Time Availability
          </span>
          <p className="text-bodyText"> Manage rooms effortlessly with our flexible admin controls. Create, update, or delete rooms and slots with ease, ensuring you always have the right space available.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
