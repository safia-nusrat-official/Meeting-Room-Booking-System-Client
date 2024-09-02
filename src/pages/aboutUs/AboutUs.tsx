import { BiSolidQuoteSingleLeft } from "react-icons/bi";
import aboutBg from "../../assets/images/aboutBg.jpg";
import aboutHeaderBg from "../../assets/images/about-us-header-bg.jpg";
import team1 from "../../assets/images/team-1.jpg";
import team2 from "../../assets/images/team-2.jpg";
import team3 from "../../assets/images/team-3.jpg";
import team4 from "../../assets/images/team-4.jpg";
import aboutSection from "../../assets/images/aboutSection.jpg";
import AOS from "aos";

AOS.init();

const AboutUs = () => {
  const teamMembers = [
    {
      image: team1,
      name: "Ethan Matthews",
      designation: "Founder & CEO",
    },
    {
      image: team2,
      name: "Liam Carter",
      designation: "Head of Product Development",
    },
    {
      image: team3,
      name: "Sophia Bennett",
      designation: "Marketing Director",
    },
    {
      image: team4,
      name: "Emily Thompson",
      designation: "Customer Support Specialist",
    },
  ];
  return (
    <section className={`font-Untitled-Sans overflow-hidden relative`}>
      <div
        className="relative bg-cover bg-fixed bg-center w-full overflow-hidden h-full"
        style={{ backgroundImage: `url('${aboutHeaderBg}')` }}
      >
        <div className="w-full h-full bg-[#00000060] backdrop-blur-sm relative text-center z-[8] flex flex-col items-center md:p-28 py-10 px-6 justify-center">
          <h1
            data-aos="fade-right"
            data-aos-animation-duration="9000"
            className="text-5xl md:text-8xl mx-auto text-[#fff] selection:bg-[#ffffff66] font-semibold"
          >
            About Us
          </h1>
          <p
            data-aos="zoom-out"
            className="text-zinc-100 mt-2 my-4 max-w-[700px] selection:bg-[#ffffff66] "
          >
            Welcome to KeyWizards! We are your one-stop shop for all things
            mechanical keyboards. Our mission is to bring you the best selection
            of high-quality keyboards, whether you’re a gamer, programmer, or
            just someone who loves the feel of a mechanical keyboard. At
            KeyWizards, every keystroke is a magical experience.
          </p>
        </div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-14 m-8 md:m-20">
        <article className="flex flex-col justify-between gap-12">
          <div data-aos="fade-down" data-aos-delay="100">
            <h3 className="text-3xl font-semibold">Our Story</h3>
            <p className="text-zinc-600 mt-2">
              KeyWizards was founded in 2020 by a group of keyboard enthusiasts
              who were tired of the limited options available in the market.
              What started as a hobby turned into a passion project, and soon,
              KeyWizards was born. From our humble beginnings in Pennsylvania,
              we've grown into a global community of keyboard lovers. Our
              journey has been fueled by a dedication to quality, innovation,
              and customer satisfaction.
            </p>
          </div>

          <div data-aos="fade-down" data-aos-delay="100" className="md:mt-0 mt-8">
            <h3 className="text-3xl font-semibold">Our Mission and Vision</h3>
            <p className="text-zinc-600 mt-2">
              Our mission at KeyWizards is to provide top-notch mechanical
              keyboards that cater to every need and preference. We believe that
              the right keyboard can transform your typing experience, whether
              for work or play. We envision a world where every keystroke is a
              joy, and everyone can find their perfect keyboard. Our vision is
              to be the leading provider of mechanical keyboards, renowned for
              our commitment to quality and innovation.
            </p>
          </div>
        </article>
        <img src={aboutBg} alt="" />
      </section>

      <section className="md:p-20 px-8 py-12 text-center bg-white">
        {/* <img src={quotes} alt="" className="w-4 absolute" /> */}
        <h3 className="text-3xl font-semibold" data-aos="fade-right">
          Meet the founders
        </h3>
        <p
          data-aos="fade-right"
          className="text-zinc-600 mt-2 mx-auto max-w-[700px]"
        >
          Our team is a diverse group of individuals who share a common passion
          for mechanical keyboards. Each member brings unique skills and
          expertise, making KeyWizards a vibrant and dynamic place to work. Meet
          the people behind KeyWizards who make it all happen:
        </p>

        <div className="grid md:grid-cols-4 mt-12 gap-12">
          {teamMembers.map((teamMember) => (
            <div
              className="card overflow-hidden transition-all  rounded-full relative group hover:scale-105"
              data-aos="fade-left"
            >
              <img
                src={teamMember.image}
                alt=""
                className="h-full object-cover"
              />
              <div className="overlay w-full h-full absolute bg-gradient-to-t from-black to-transparent bottom-0 transition-all opacity-100 md:opacity-0 group-hover:opacity-100"></div>
              <div className="w-full h-full pb-8 md:px-4 px-12 absolute text-white flex flex-col justify-end md:-bottom-28 group-hover:bottom-0 bottom-0 transition-all">
                <span className="font-medium cursor-pointer">
                  {teamMember.name}
                </span>
                <span className="text-white cursor-pointer">
                  {teamMember.designation}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="relative bg-cover bg-fixed bg-no-repeat"
        style={{ backgroundImage: `url("${aboutSection}")` }}
      >
        <div
          className="
           bg-[#0000007d] backdrop-blur-sm text-[#ffffffe0] lg:py-36 px-8 md:px-12 lg:px-20 py-10"
        >
          <BiSolidQuoteSingleLeft className="md:text-8xl text-6xl relative" />
          <h3
            className="text-2xl lg:max-w-[700px] md:max-w-[500px] relative md:left-20 left-0 font-serif top-0 md:-top-8 text-center font-medium"
            data-aos="zoom-out"
            data-aos-animation-duration="4000"
          >
            Every great idea starts with a single dream. KeyWizards was born
            from a simple belief: that the tools we use every day should inspire
            us. What started as a search for the perfect keystroke became a
            mission to bring the joy of mechanical keyboards to everyone.
          </h3>
          <BiSolidQuoteSingleLeft className="text-6xl md:text-8xl float-right -top-8 lg:-top-28 md:-top-16 left-0 lg:-left-20 md:-left-8 relative rotate-180" />
          <div className="text-center md:mt-0 mt-12" data-aos="fade-down">
            <i>- Ethan Matthews, Founder and CEO</i>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AboutUs;
