import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoMail } from "react-icons/io5";
import contactHeaderBg from "../../assets/images/contact-us-header.png";
import officeReception from "../../assets/images/office-reception.jpg";
import customerSupport from "../../assets/animations/customerSupport.json";
import location from "../../assets/animations/location-icon.json";
import FAQs from "../../assets/animations/faqs.json";
import twitter from "../../assets/images/twitter.png";
import feedback from "../../assets/images/feedback.jpg";
import instagram from "../../assets/images/instagram.png";
import { FaPhoneAlt } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";
import { FaLocationDot } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FormEvent } from "react";
import LottieAnimation from "@/lib/LottieAnimation";

const ContactUs = () => {
  return (
    <section className="font-Untitled-Sans realtive overflow-hidden">
      <div
        className="relative bg-cover bg-fixed bg-center w-full overflow-hidden h-full"
        style={{ backgroundImage: `url('${contactHeaderBg}')` }}
      >
        <div className="w-full h-full bg-[#00000060] backdrop-blur-sm relative text-center z-[8] flex flex-col items-center md:p-28 py-10 px-6 justify-center">
          <h1
            data-aos="fade-right"
            data-aos-animation-duration="9000"
            className="text-5xl md:text-8xl mx-auto text-[#fff] selection:bg-[#ffffff66] font-extrabold"
          >
            Contact Us
          </h1>
          <p
            data-aos="zoom-out"
            className="text-zinc-100 mt-2 my-4 max-w-[700px] selection:bg-[#ffffff66] "
          >
            At KeyWizards, your satisfaction is our top priority. Whether you
            have a question about our products, need assistance with an order,
            or simply want to share your feedback, we’re here to help. Our team
            is dedicated to providing you with the best possible experience, and
            we’re just a message away.
          </p>
        </div>
      </div>

      <section className="md:p-20 p-8 bg-white">
        <h3
          className="text-3xl text-center text-custom-primary font-bold"
          data-aos="fade-right"
        >
          Get in Touch
        </h3>
        <p
          className="text-lg mb-4 text-center text-custom-primary font-normal max-w-[36rem] mt-2 mx-auto text-slate-600"
          data-aos="fade-right"
        >
          Reach out through the form below, call us, or connect via our social
          media channels. Our team is ready to assist you.
        </p>
        <div className="flex z-[3] lg:gap-14 md:gap-8 h-fit justify-between overflow-hidden md:flex-row flex-col items-center">
          <div
            data-aos="fade-right"
            data-aos-animation-duration="5000"
            data-aos-offset="200"
            className="border-l-[1px] md:order-1 mb-12 order-2 bg-[#a09f9f17] border-zinc-500 p-8"
          >
            <h4 className="text-xl text-zinc-800 font-medium">
              Customer Support
            </h4>
            <span>
              For any inquiries or support, feel free to reach out to our
              customer support team. We aim to respond to all queries within 24
              hours.
            </span>
            <ul className="mt-6 flex text-custom-primary flex-col gap-4">
              <li className="flex gap-2 items-center font-[500]">
                <IoMail className="text-xl" /> support@meetwise.com
              </li>
              <li className="flex gap-2 items-center font-[500]">
                <FaPhoneAlt /> +1-800-123-4567
              </li>
              <li className="flex gap-2 items-center font-[500]">
                <GoClockFill /> Monday to Friday, 9 AM - 6 PM (EST)
              </li>
            </ul>
          </div>
          <div
            data-aos="zoom-out"
            data-aos-animation-duration="5000"
            className="md:order-2 z-[2] order-1"
          >
            <LottieAnimation
              width={400}
              height={400}
              animationData={customerSupport}
            ></LottieAnimation>
          </div>
        </div>

        <div className="flex h-fit md:gap-14 gap-4 justify-between overflow-hidden md:flex-row flex-col items-center">
          <div data-aos="zoom-out" data-aos-animation-duration="5000">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4237.584021650171!2d-121.14915052298684!3d37.88901712593373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia%2C%20USA!5e0!3m2!1sen!2sbd!4v1725245238108!5m2!1sen!2sbd"
              width="500"
              height="450"
              style={{ border: "0" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div
            data-aos="fade-right"
            className="border-r-[1px] text-right bg-[#a09f9f17] border-zinc-500 md:p-8 p-4"
          >
            <h4 className="text-xl text-zinc-800 font-bold">Our Location</h4>
            <span>
              Find us at our office or use the map below to locate us easily
            </span>
            <LottieAnimation animationData={location}></LottieAnimation>
            <p className="mt-6 font-medium">
              MeetWise Head Quarters
              <br />
              1234 Office Street, Suite 567 <br />
              Burnham, South California, 242442
              <br />
              USA
            </p>
          </div>
        </div>
      </section>

      <section
        className="relative bg-cover bg-center bg-fixed bg-no-repeat"
        style={{ backgroundImage: `url("${officeReception}")` }}
      >
        <div
          className="flex flex-col items-center text-center selection:bg-[#ffffff3c]
           bg-[#0000007d] backdrop-blur-sm text-[#ffffffe0] md:py-36 py-20 md:px-20 px-8"
        >
          <div>
            <h1
              data-aos="fade-right"
              data-aos-animation-duration="9000"
              className="text-8xl mx-auto text-[#fff] selection:bg-[#ffffff66] font-semibold"
            >
              Visit Us
            </h1>
            <p
              data-aos="zoom-out"
              data-aos-delay="100"
              className="text-zinc-100 mt-2 my-4 max-w-[700px] selection:bg-[#ffffff66] "
            >
              While we primarily operate online, we love meeting our customers
              and partners in person. If you’re in the area, feel free to visit
              our office.
            </p>
          </div>
          <div className="mt-6 flex flex-col  items-center gap-4">
            <li
              data-aos="zoom-in"
              className="flex gap-2 items-start md:items-center font-[500]"
            >
              <FaLocationDot className="text-4xl md:text-xl" /> KeyWizards
              Headquarters 1234 Mechanical Lane, Typing City, TC 56789
            </li>
            <li
              data-aos="zoom-in"
              className="flex gap-2 items-start md:items-center font-[500]"
            >
              <GoClockFill className="text-2xl md:text-xl" /> Monday to Friday,
              10 AM - 4 PM (EST)
            </li>
          </div>
        </div>
      </section>

      <section className="md:p-20 p-8 md:gap-14 grid gap-4 lg:grid-cols-2 grid-cols-1">
        <div className="">
          <LottieAnimation width={450} height={400} animationData={FAQs}></LottieAnimation>
        </div>

        <div className="flex flex-col">
          <h3
            className="text-4xl mb-4 text-custom-primary font-semibold"
            data-aos="fade-left"
          >
            Frequently Asked Questions
          </h3>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
              How can I book a meeting room with MeetWise?              </AccordionTrigger>
              <AccordionContent>
              You can book a meeting room through our website or app. Simply choose your preferred location, select the room and time slot, and confirm your booking
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
              Can I modify or cancel my booking?
              </AccordionTrigger>
              <AccordionContent>
              Yes, you can modify or cancel your booking up to 24 hours before the scheduled time. Just log in to your account and go to 'My Bookings' to make changes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
              What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent>We accept all major credit and debit cards, including Visa, MasterCard, and American Express. You can also pay via PayPal and Stripe
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
              What amenities are included with the meeting rooms?
              </AccordionTrigger>
              <AccordionContent>
              Our meeting rooms come equipped with high-speed Wi-Fi, projectors, whiteboards, conference call facilities, and comfortable seating. Additional amenities are available upon request.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">
              How do I know if a room is available for booking?
              </AccordionTrigger>
              <AccordionContent>Availability is displayed in real-time on our website and app. You can check the calendar for each room to find available time slots.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left">
              What should I do if I encounter a problem during my booking?
              </AccordionTrigger>
              <AccordionContent>
              If you face any issues during booking, please contact our customer support team via email at support@meetwise.com or call us at +1 (123) 456-7890.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="md:p-20 p-8  bg-white">
        <h3
          className="text-4xl mb-4 text-custom-primary font-semibold"
          data-aos="fade-left"
          data-aos-delay={400}
        >
          Stay Connected
        </h3>

        <div className="flex lg:flex-row flex-col justify-between gap-0 md:gap-14 mb-6">
          <div data-aos="fade-left" data-aos-delay={500}>
            <h4 className="text-xl text-zinc-800 font-medium">
              Follow Us On Socials
            </h4>
            <p className="md:w-[400px] text-zinc-500">
              We’d love to stay connected with you! Follow us on our social
              media channels for the latest updates, product launches, and
              special offers.
            </p>
          </div>
          <div data-aos="fade-left" data-aos-delay={400}>
            <ul className="flex md:flex-row flex-col mt-6 md:mt-0 justify-between gap-4">
              <li>
                <a
                  href="https://www.facebook.com/"
                  className="border-[1px] lg:w-12 w-52 box-content rounded-full p-2 bg-white transition-all duration-500 flex items-center ease-in-out hover:w-52 overflow-hidden group"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"
                    alt=""
                    className="w-12"
                  />
                  <p className="lg:opacity-0 cursor-pointer text-blue-700 px-2 transition-opacity duration-500 delay-300 hover:underline underline lg:no-underline underline-offset-2 group-hover:opacity-100 opacity-100  font-medium">
                    fb.com/meetwise
                  </p>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  className="border-[1px] lg:w-12 max-w-52 lg:p-2 md:pr-16 box-content rounded-full p-2 bg-white transition-all duration-500 flex items-center ease-in-out hover:w-40 overflow-hidden group"
                >
                  <img src={instagram} alt="" className="w-12" />
                  <p className="lg:opacity-0 cursor-pointer text-pink-700 px-2 transition-opacity duration-500 delay-300 hover:underline underline-offset-2 group-hover:opacity-100 opacity-100 underline lg:no-underline font-medium">
                    @meetwise
                  </p>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/"
                  className="border-[1px] lg:w-12 max-w-52 lg:p-2 md:pr-16 box-content rounded-full p-2 bg-white transition-all duration-500 flex items-center ease-in-out hover:w-40 overflow-hidden group"
                >
                  <img src={twitter} alt="" className="w-12" />
                  <p className="lg:opacity-0 cursor-pointer text-zinc-700 px-2 transition-opacity duration-500 delay-300 hover:underline underline-offset-2 group-hover:opacity-100 opacity-100 font-medium underline lg:no-underline ">
                    @meetwise
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-zinc-500 text-xl mb-6">Or</p>

        <div className="flex md:flex-row flex-col justify-between gap-4 md:gap-14 mb-6">
          <div data-aos="fade-left" data-aos-delay={400}>
            <h4 className="text-xl text-zinc-800 font-medium">
              Subscribe to Our Newsletter
            </h4>
            <p className=" md:w-[400px] mt-2 text-zinc-500">
              Stay connected with MeetWise! Subscribe to our newsletter to receive the latest updates, exclusive offers, and valuable tips on optimizing your meeting spaces. Get all the insights you need, delivered straight to your inbox.
            </p>
          </div>
          <div
            data-aos="fade-left"
            data-aos-delay={400}
            className="flex md:mt-0 mt-4 md:flex-row flex-col w-full md:gap-0 gap-4 max-w-sm items-center space-x-2"
          >
            <Input type="email" placeholder="Email" />
            <Button type="submit">Subscribe</Button>
          </div>
        </div>
      </section>

      <section
        className="relative bg-cover bg-center bg-fixed bg-no-repeat"
        style={{ backgroundImage: `url("${feedback}")` }}
      >
        <div
          className="flex flex-col items-center text-center selection:bg-[#ffffff3c]
           bg-[#0000007d] backdrop-blur-sm text-[#ffffffe0] py-20 md:py-36 px-8 md:px-20"
        >
          <h1
            data-aos="fade-left"
            className="text-4xl md:text-8xl mx-auto text-[#fff] selection:bg-[#ffffff66] font-bold mb-2"
          >
            Feedback and Suggestions
          </h1>
          <p
            data-aos="zoom-out"
            data-aos-delay="100"
            className="text-zinc-100 mt-2 my-4 max-w-[700px] selection:bg-[#ffffff66] "
          >
           Your feedback is invaluable to us. Whether it’s a suggestion to enhance our services or a comment on your experience with MeetWise, we want to hear from you. Share your thoughts by emailing us at feedback@meetwise.com.
          </p>
        </div>
      </section>

      <section className="md:p-20 p-8 text-center">
        <h3
          className="text-4xl mb-2 text-custom-primary font-semibold"
          data-aos="zoom-out"
          data-aos-delay={500}
        >
          Contact Form
        </h3>
        <p
          data-aos="fade-up"
          data-aos-delay={500}
          className="md:w-[400px] mx-auto mb-8 text-zinc-500"
        >
          Can’t find what you’re looking for? Fill out the contact form below,
          and we’ll get back to you as soon as possible
        </p>

        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            toast.message("Your message has been sent");
            const form = e.currentTarget as HTMLFormElement;

            form.reset();
          }}
          className="border-[1px] gap-6 grid md:grid-cols-2 grid-cols-1 bg-white border-zinc-300 p-6 md:p-8 rounded-md"
        >
          <div className="col-span-2 grid md gap-2 text-left ">
            <label
              htmlFor="title"
              className="text-zinc-700 font-medium after:content-['*'] after:text-red-500 after:ml-0.5"
            >
              Name
            </label>
            <Input
              id="title"
              type="text"
              className={`w-full`}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="grid gap-2 text-left md:col-span-1 col-span-2">
            <label
              htmlFor="title"
              className="text-zinc-700 font-medium after:content-['*'] after:text-red-500 after:ml-0.5"
            >
              Email
            </label>
            <Input
              id="title"
              type="text"
              className={`w-full`}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="grid gap-2 col-span-2 text-left">
            <label
              htmlFor="title"
              className="text-zinc-700 font-medium after:content-['*'] after:text-red-500 after:ml-0.5"
            >
              Subject
            </label>
            <Input
              id="title"
              type="text"
              className={` w-full`}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="grid gap-2 col-span-2 text-left">
            <label
              htmlFor="description"
              className="text-zinc-700 after:content-['*'] after:text-red-500 after:ml-0.5 font-medium"
            >
              Message
            </label>
            <Textarea
              id="description"
              rows={10}
              placeholder="Enter your message here"
              required
              className="min-h-32"
            />
          </div>

          <Button type="submit" className="col-span-2 mt-4">
            Send Message
          </Button>
        </form>
      </section>
    </section>
  );
};

export default ContactUs;
