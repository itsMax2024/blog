import React from "react";
import "./Main.css";
import Title from "../Title/Title";
import AllArticles from "./AllArticles/AllArticles";
import TopArticles from "./TopArticles/TopArticles";

const Main = () => {
  type posts = {
    id: string;
    title: string;
    description: string;
    image: string;
  };

  return (
    <section className="main">
      <TopArticles />
      <AllArticles />
    </section>
  );
};

export default Main;
