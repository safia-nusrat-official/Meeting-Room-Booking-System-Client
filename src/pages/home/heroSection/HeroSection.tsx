import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "@/components/ui/button";
import HeroTitle from "./HeroTitle";
import { Link } from "react-router-dom";
import heroVideo from "../../../assets/images/heroBG.mp4";
import heroBg from "../../../assets/images/hero-bg-2.jpg";

AOS.init();

const HeroSection = () => {
  return (
    <div className="relative bg-no-repeat bg-fixed bg-cover" style={{backgroundImage:`url("${heroBg}")`}}>
      <div className="overlay bg-[#00000050] backdrop-blur-sm absolute w-full h-full"></div>
      <div className="relative w-full selection:bg-[#c7f9cc8a] p-8 text-center flex flex-col items-center justify-center">
        <HeroTitle></HeroTitle>
        <p data-aos="fade-up" data-aos-animation-duration={600} data-aos-delay="300" className="text-white mt-4">
          Efficient, hassle-free room booking for all your meeting needs.
        </p>
        <Link data-aos="fade-up" data-aos-animation-duration={500} data-aos-delay="300" to="/rooms">
          <Button className="mt-6 hover:border-slate-800 hover:border-2 hover:bg-transparent font-bold hover:text-slate-800 bg-slate-800 rounded-none">
            Book Now
          </Button>
        </Link>
      </div>
      <div className="hero-image hidden md:mr-12 md:mt-8 overflow-hidden">
        <video className="scale-105" autoPlay loop muted>
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>{" "}
      </div>
    </div>
  );
};

export default HeroSection;
