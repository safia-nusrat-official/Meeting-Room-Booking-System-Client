import { useEffect, useState } from "react";
import "../../../style/heroSection.css";

const HeroTitle = () => {
  const lines = ["Book Your", "Ideal Meeting", "Room with", "Ease"];

  const typingSpeed = 100;

  const [displayedText, setDisplayedText] = useState(["", "", "", ""]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    const typeLine = (lineIndex: number, text: string, callback: any) => {
      let index = 0;
      const type = () => {
        if (index < text.length) {
          setDisplayedText((prev) => {
            const newDisplayedText = [...prev];
            newDisplayedText[lineIndex] = text.substring(0, index + 1);
            return newDisplayedText;
          });
          index++;
          setTimeout(type, typingSpeed);
        } else {
          setCurrentLineIndex(lineIndex + 1);
          callback();
        }
      };
      type();
    };

    const typeAllLines = () => {
      typeLine(0, lines[0], () => {
        setTimeout(() => {
          typeLine(1, lines[1], () => {
            setTimeout(() => {
              typeLine(2, lines[2], () => {
                setTimeout(() => {
                  typeLine(3, lines[3], () => {});
                }, typingSpeed);
              });
            }, typingSpeed);
          });
        }, typingSpeed);
      });
    };

    typeAllLines();
  }, []);

  return (
    <h1 className="font-black text-slate-800 md:text-6xl text-4xl h-fit md:h-[250px]">
      {displayedText.map((text, index) => (
        <>
          <span className={index === 3 ? "typing-effect" : ""}>{text}</span>
          {index !== 3 && <br />}
        </>
      ))}
    </h1>
  );
};

export default HeroTitle;
