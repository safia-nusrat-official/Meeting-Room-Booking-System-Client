import { ReactNode } from "react";

const SectionHeading = ({
  children,
  mode = "light",
  animateFrom = undefined,
  center = false,
  showIn = ["all"],
}: {
  children: ReactNode;
  mode?: "light" | "dark";
  animateFrom?: "left" | "right";
  center?: boolean;
  showIn?: ("md" | "sm" | "lg" | "all")[];
}) => {
  return (
    <h2
      data-aos={`${animateFrom && `fade-${animateFrom}`}`}
      data-aos-delay="500"
      className={`font-extrabold text-3xl md:text-5xl cursor-pointer md:mt-0 lg:text-6xl md:mb-0 mb-4  ${
        mode === "light" ? "text-[#fefefe]" : "text-slate-800"
      } 
        ${
          showIn.includes("all")
            ? "block"
            : showIn.includes("md") && showIn.includes("sm")
            ? "md:block block lg:hidden"
            : "md:hidden hidden lg:block"
        }
        ${center ? "text-center" : ""}
        `}
    >
      {children}
    </h2>
  );
};

export default SectionHeading;
