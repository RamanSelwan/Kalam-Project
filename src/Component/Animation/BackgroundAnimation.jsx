// BackgroundAnimation.jsx
import React from "react";

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Create multiple triangles */}
      <div className="absolute w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-16 border-b-white opacity-20 animate-fall left-10" />
      <div className="absolute w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-16 border-b-white opacity-20 animate-fall left-30" />
      <div className="absolute w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-16 border-b-white opacity-20 animate-fall left-50" />
      <div className="absolute w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-16 border-b-white opacity-20 animate-fall left-70" />
      <div className="absolute w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-16 border-b-white opacity-20 animate-fall left-90" />
    </div>
  );
};

export default BackgroundAnimation;
