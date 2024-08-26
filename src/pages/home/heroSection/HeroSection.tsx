import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "@/components/ui/button";
import React from "react";
import HeroTitle from "./HeroTitle";
import { Link } from "react-router-dom";
import heroVideo from "../../../assets/images/heroBG.mp4";

AOS.init();

const HeroSection = () => {
  const heroImgUrl =
    "https://plodoincasino.com/wp-content/uploads/2024/07/bed-with-wooden-headboard-2021-08-26-15-45-11-utc_11zon_11zon-1.webp";

  return (
    <div className="grid md:grid-cols-2">
      <div className="relative md:pl-12 md:pb-16 md:pt-8 md:pr-8 selection:bg-[#c7f9cc8a]">
        <HeroTitle></HeroTitle>
        <p className="text-bodyText mt-4">
          Efficient, hassle-free room booking for all your meeting needs.
        </p>
        <Link to="/meeting-rooms">
          <Button className="mt-6 hover:border-slate-800 hover:border-2 hover:bg-transparent font-bold hover:text-slate-800 bg-slate-800 rounded-none">
            Book Now
          </Button>
        </Link>
      </div>
      <div className="hero-image md:mr-12 md:mt-8 overflow-hidden">
        <video className="scale-105" autoPlay loop muted>
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>{" "}
      </div>
    </div>
  );
};

export default HeroSection;
