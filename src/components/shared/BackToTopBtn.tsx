import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { IoChevronUp } from "react-icons/io5";

const BackToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if(window.scrollY>300){
        setIsVisible(true)
    }else{
        setIsVisible(false)
    }
  }
  const scrollToTop = () => {
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
  }
  useEffect(()=>{
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])
  return (
    <Button onClick={scrollToTop} className={`fixed justify-center rounded-full p-0 text-xl w-10 items-center border-zinc-300 border-[1px] shadow-sm z-40 bottom-4 md:bottom-10 right-4 md:right-10 ${isVisible?"flex":"hidden"}`} variant={"secondary"}>
      <IoChevronUp></IoChevronUp>
    </Button>
  );
};

export default BackToTopBtn;
