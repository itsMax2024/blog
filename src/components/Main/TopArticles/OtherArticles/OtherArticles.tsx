import React from "react";
import { Link } from "react-router-dom";
import "./OtherArticles.css";

const OtherArticles = () => {
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
  //   const topArticle = posts.find((post) => post.id === "3");

  return (
    <div className="other-top-articles">
      {posts.map((post) => (
        <div className="other-top-article">
          <Link to={`post/${post.id}`}>
            <img src={post.image} alt={post.title} />
            <div className="other-top-article-context">
              <h2>{post.title}</h2>
            </div>
            <div className="other-top-article-info">
              <div className="other-top-article-info-wrapper">
                <div className="other-top-article-date-wrapper">
                  <img src="/assets/date.png" alt="" />
                  <p>12 13 1989</p>
                </div>
                <div className="other-top-article-time-wrapper">
                  <img src="/assets/clock10.png" alt="" />
                  <p>مطالعه 10</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default OtherArticles;
