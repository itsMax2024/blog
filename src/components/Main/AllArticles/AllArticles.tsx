import React from "react";
import { Link } from "react-router-dom";
import Title from "../../Title/Title";
import "../Main.css";

const AllArticles = () => {
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
  return (
    <div className="all-articles">
      <Title title="آخرین مطالب" />
      {posts.map((article) => (
        <div className="article">
          <Link to={`/post/${article.id}`}>
            <div className="article-context">
              <img src="/assets/fire.png" alt="" />
              <h2>{article.title}</h2>
            </div>
            <div className="article-info">
              <div className="comments-wrapper">
                <img src="/assets/comment.png" alt="" />
                <p>20</p>
              </div>
              <div className="date-wrapper">
                <img src="/assets/date.png" alt="" />
                <p>Created 2 min ago</p>
              </div>
            </div>

            <div className="article-img">
              <img src={article.image} alt={article.title} />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllArticles;
