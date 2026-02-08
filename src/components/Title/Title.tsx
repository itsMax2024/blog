import React from "react";
import "./Title.css";

type titleprops = {
  title: string;
};

const Title = ({ title }: titleprops) => {
  return (
    <div className="title">
      <h4>{title}</h4>
    </div>
  );
};

export default Title;
