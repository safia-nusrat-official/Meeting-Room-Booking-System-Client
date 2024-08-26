const SectionHeading = ({
    text,
    mode = "light",
    animateFrom = undefined,
    center = false,
    showIn = ["all"],
  }: {
    text: string;
    mode?: "light" | "dark";
    animateFrom?: "left" | "right";
    center?: boolean;
    showIn?: ("md" | "sm" | "lg" | "all")[];
  }) => {
    return (
      <h2
        data-aos={`${animateFrom && `fade-${animateFrom}`}`}
        data-aos-delay="500"
        className={`font-extrabold text-3xl md:text-5xl md:mt-0 lg:text-6xl md:mb-0 mb-4  ${
          mode === "light" ? "text-[#fefefe]" : "text-slate-800"
        } 
        ${
          showIn.includes("all") ? "block": showIn.includes("md") && showIn.includes("sm")
            ? "md:block block lg:hidden"
            : "md:hidden hidden lg:block"
        }
        ${center ? "text-center" : ""}
        `}
      >
        {text}
      </h2>
    );
  };
  
  export default SectionHeading;
  