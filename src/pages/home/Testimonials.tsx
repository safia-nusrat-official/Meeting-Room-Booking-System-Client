import SectionHeading from "@/components/shared/SectionHeading";
import "../../style/customTestimonial.css";
import reviews from "./../../../public/testimonials.json";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { Rate } from "antd";
import { useEffect, useState } from "react";

const TestimonialSection = () => {
  const [slidesPerView, setSlidesPerView] = useState(3);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 960) {
        setSlidesPerView(3);
      } else if (960 >= window.innerWidth && window.innerWidth > 536) {
        setSlidesPerView(2);
      } else if (window.innerWidth <= 536) {
        setSlidesPerView(1);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const testimonialBg = "https://hotellerv6-5.b-cdn.net/lifestyle/wp-content/uploads/sites/3/2023/09/creative-and-modern-vintage-living-room-interior-d-2022-12-07-04-24-20-utc.jpg"
  return (
    <section className="relative h-[800px] overflow-hidden md:h-[750px] text-white flex flex-col items-center">
      <div className="hero-image-container h-full relative ">
        <div className="overlay absolute bg-[#00000048] backdrop-blur-sm z-1 h-full w-full"></div>
        <img
          src={testimonialBg}
          alt="hero-image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center absolute md:top-8 top-0 md:p-20 px-8 py-12 w-full z-1">
        <SectionHeading
          mode="light"
          center={true}
        >What Our Customers Say</SectionHeading>
        <p className="text-zinc-50 text-[16px] max-w-[32rem] mx-auto mb-8 text-center">
          Read genuine feedback from our satisfied customers who found their
          ideal mechanical keyboards and exceptional service with us.
        </p>
        <Swiper
          spaceBetween={24}
          slidesPerView={slidesPerView}
          pagination={true}
          loop={true}
          modules={[Navigation, Pagination]}
          navigation={true}
          className="w-full px-10 custom-swiper"
        >
          {reviews.length &&
            reviews.map((reviews) => (
              <SwiperSlide>
                <div className="flex text-center flex-col items-center border-[1px] border-[#ffffff4e] backdrop-blur-xl md:h-[26rem] rounded-md p-6 mb-16 shadow-sm">
                  <img
                    src={reviews.image}
                    alt=""
                    className="w-16 rounded-full h-16 aspect-square object-cover object-center"
                  />
                  <span className="font-[600]">{reviews.name}</span>
                  <p className="text-[#ffffff5f] mb-6">{reviews.email}</p>
                  <Rate
                    className="my-2"
                    disabled
                    defaultValue={reviews.rating}
                    allowHalf
                    style={{
                      color: "#fff",
                    }}
                    allowClear
                  ></Rate>
                  <h4 className="font-[500] mt-4">{reviews.title}</h4>
                  <p className="text-[#ffffffa7] mb-6">{reviews.description}</p>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
