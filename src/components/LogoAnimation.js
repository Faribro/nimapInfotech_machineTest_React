import React from "react";
import "../LogoAnimation.css";

const LogoAnimation = () => {
  return (
    <div className="logo-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 50"
        className="logo-svg"
      >
        <text x="0" y="40" className="logo-text">
          MovieDb
        </text>
      </svg>
    </div>
  );
};

export default LogoAnimation;
