import React from "react";
import "../Hero/Hero.css";
import dark_arrow from "../../assets/dark-arrow.png";

const Hero = () => {
  return (
    <div className="hero container">
      <div className="hero-text ">
        <h1 className="text-purple-500">Astrid</h1>
        <p>This is a sample website.</p>
        <button className="btn hero-btn">
          Explore more! <img src={dark_arrow} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
