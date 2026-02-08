import React from "react";
import { Link } from "react-router-dom";
import "../Main.css";
import Title from "../../Title/Title";
import OtherArticles from "./OtherArticles/OtherArticles";

const TopArticles = () => {
  type posts = {
    id: string;
    title: string;
    description: string;
    image: string;
  };
  const posts = [
    {
      id: "1",
      title: "اولین پست من",
      description: "به نام خداوند جان و خرد، کزان برتر اندیشه بر نگذرد",
      image: "/assets/gaming/gallery_1.png",
    },
    {
      id: "2",
      title: "دومین پست من",
      description: "به نام خداوند جان و خرد، کزان برتر اندیشه بر نگذرد",
      image: "/assets/gaming/gallery_2.png",
    },
    {
      id: "3",
      title: "سومین پست من",
      description: "کار عمیق",
      image: "/assets/gaming/gallery_3.png",
    },
    {
      id: "4",
      title: "سومین پست من",
      description: "کار عمیق",
      image: "/assets/gaming/gallery_4.png",
    },
  ];
  const topArticle = posts.find((post) => post.id === "2");
  return (
    <div className="top-articles">
      <Title title="پیشنهادی" />
      <div className="top-article">
        <Link to={`post/${topArticle?.id}`}>
          <img src={topArticle?.image} alt={topArticle?.title} />
          <div className="top-article-context">
            <h2>{topArticle?.title}</h2>
          </div>
          <div className="top-article-info">
            <div className="top-article-info-wrapper">
              <div className="top-article-date-wrapper">
                <img src="/assets/date.png" alt="" />
                <p>12 13 1989</p>
              </div>
              <div className="top-article-time-wrapper">
                <img src="/assets/clock10.png" alt="" />
                <p>مطالعه 10</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <OtherArticles />
    </div>
  );
};

export default TopArticles;
