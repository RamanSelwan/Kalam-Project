import React, { useEffect, useState } from "react";
import backgroundImage from "../../../Assets/backgroundImage.jpg"; // Importing the image
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll"; // For scrolling animation

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scrolling position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-50 p-8">
        <div
          className={`text-center transition-opacity duration-1000 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1
            className={`text-white text-4xl md:text-6xl font-bold mb-4 transition-transform duration-500 ${
              isScrolled ? "translate-y-0" : "-translate-y-10"
            }`}
          >
            The largest community of enthusiasts writers
          </h1>
          <p
            className={`text-white text-lg md:text-xl mb-8 transition-transform duration-500 ${
              isScrolled ? "translate-y-0" : "-translate-y-5"
            }`}
          >
            Have you ever posted any photo on social media?
          </p>
          <ScrollLink
            to="target-section"
            smooth={true}
            duration={800}
            className="cursor-pointer"
          >
          </ScrollLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
