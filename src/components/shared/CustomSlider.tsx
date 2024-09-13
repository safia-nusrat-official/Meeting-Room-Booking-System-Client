import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";

import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

import { Navigation, FreeMode, Thumbs, Pagination } from "swiper/modules";
import { useRef } from "react";
import { Skeleton } from "antd";
import Swiper from "swiper";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const CustomSlider = ({
  images,
  isLoading,
}: {
  images: string[];
  isLoading: boolean;
}) => {
  const thumbsSwiper = useRef<Swiper | null>(null);
  const prevRef = useRef<any | null>(null);
  const nextRef = useRef<any | null>(null);
  
  return (
    <div className="relative img-container mb-4">
      <div className="flex px-4 z-20 justify-between items-center absolute w-full h-1/2 top-0 left-0">
        <button
          className="bg-white rounded-full p-2 text-slate-500 text-xl"
          ref={prevRef}
        >
          <IoChevronBack></IoChevronBack>
        </button>
        <button
          className="bg-white rounded-full p-2 text-slate-500 text-xl"
          ref={nextRef}
        >
          <IoChevronForward></IoChevronForward>
        </button>
      </div>
      <SwiperComponent
        loop={true}
        thumbs={{ swiper: thumbsSwiper.current }}
        spaceBetween={10}
        modules={[Navigation, Pagination, FreeMode, Thumbs]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={true}
        className="room-swiper bg-white rounded-md overflow-hidden"
      >
        {images.length > 0 &&
          images.map((roomImage, index) => (
            <SwiperSlide key={index+1}>
              <img src={roomImage} alt="" />
            </SwiperSlide>
          ))}
        {isLoading &&
          Array(4)
            .fill("img")
            .map(() => (
              <SwiperSlide>
                <div className="">Hi</div>
              </SwiperSlide>
            ))}
      </SwiperComponent>
      <SwiperComponent
        onSwiper={(swiper) => (thumbsSwiper.current = swiper)}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumbSwiper mt-4"
      >
        {images.length > 0 &&
          images.map((roomImage, index) => (
            <SwiperSlide key={index+1}>
              <img
                src={roomImage}
                alt=""
                className="h-fit hover:opacity-75 transition-all rounded-sm overflow-hidden"
              />
            </SwiperSlide>
          ))}
        {isLoading &&
          Array(4)
            .fill("img")
            .map(() => (
              <SwiperSlide>
                <div>
                  <Skeleton.Avatar
                    active={true}
                    size={"large"}
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                    shape={"square"}
                  />
                </div>
              </SwiperSlide>
            ))}
      </SwiperComponent>
    </div>
  );
};

export default CustomSlider;
