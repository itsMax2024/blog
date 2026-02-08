import React from "react";
import "./About.css";
import about_img from "../../assets/about.png";
import play_icon from "../../assets/play-icon.png";

const About = ({ playState, setPlayState }) => {
  const video = document.querySelector(".video");

  return (
    <div className="about container">
      <div className="about-left">
        <img src={about_img} className="about-img " alt="" />
        <img
          src={play_icon}
          className="play-icon"
          alt=""
          onClick={() => {
            setPlayState(true);
            video.play();
          }}
        />
      </div>
      <div className="about-right">
        <h3>ABOUT UNIVERSITY</h3>
        <h2>Tomorrow's leaders</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis
          ab cupiditate, numquam nihil consequatur earum?
        </p>
        <p>Lorem ipsum dolor sit.</p>
      </div>
    </div>
  );
};

export default About;
