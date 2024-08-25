import AOS from 'aos';
import 'aos/dist/aos.css';
import { Button } from "@/components/ui/button";
import PaperPlaneAnimationData from "../../../assets/animations/calendarAnimation.json"
import React from "react";
import HeroTitle from "./HeroTitle";
import { Link } from "react-router-dom";
import CalendarAnimation from "@/lib/LottieAnimation";

AOS.init()

const HeroSection = () => {
  const heroImgUrl =
    "https://plodoincasino.com/wp-content/uploads/2024/07/bed-with-wooden-headboard-2021-08-26-15-45-11-utc_11zon_11zon-1.webp";

  return (
    <div className="grid md:grid-cols-2">
      <div className="relative md:pl-12 md:py-16 md:pr-8 selection:bg-[#c7f9cc8a]">
        <HeroTitle></HeroTitle>
        <p className="text-bodyText mt-4">
          Efficient, hassle-free room booking for all your meeting needs.
        </p>
        <Link to="/meeting-rooms">
          <Button className="mt-6 hover:border-slate-800 hover:border-2 hover:bg-transparent font-bold hover:text-slate-800 bg-slate-800 rounded-none">Book Now</Button>
        </Link>
        <div data-aos="fade-up" className="absolute top-0 -right-[7rem]"><CalendarAnimation animationData={PaperPlaneAnimationData}></CalendarAnimation></div>
      </div>
      <div className="hero-image">
        <img src={heroImgUrl} alt="" className="object-cover h-full" />
      </div>
    </div>
  );
};

export default HeroSection;
