import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Main.css";
import Title from "../../Title/Title";
import OtherArticles from "./OtherArticles/OtherArticles";
import { getPosts } from "../../../api";
import { getLatestPosts } from "../../../api";
import { getTopRecommended } from "../../../api";

const TopArticles = () => {
  type posts = {
    id: string;
    title: string;
    description: string;
    image: string;
  };
  // const posts = [
  //   {
  //     id: "1",
  //     title: "اولین پست من",
  //     description: "به نام خداوند جان و خرد، کزان برتر اندیشه بر نگذرد",
  //     image: "/assets/gaming/gallery_1.png",
  //   },
  //   {
  //     id: "2",
  //     title: "دومین پست من",
  //     description: "به نام خداوند جان و خرد، کزان برتر اندیشه بر نگذرد",
  //     image: "/assets/gaming/gallery_2.png",
  //   },
  //   {
  //     id: "3",
  //     title: "سومین پست من",
  //     description: "کار عمیق",
  //     image: "/assets/gaming/gallery_3.png",
  //   },
  //   {
  //     id: "4",
  //     title: "سومین پست من",
  //     description: "کار عمیق",
  //     image: "/assets/gaming/gallery_4.png",
  //   },
  // ];

  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const loadPosts = async () => {
  //     try {
  //       const allPosts = await getPosts();
  //       setPosts(allPosts);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   loadPosts();
  // }, []);

  // const topArticle = posts.find((post) => post.id === 6);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const thePost = await getTopRecommended();

        setPosts(thePost);
      } catch (err) {
        console.log(err);
      }
    };
    loadPost();
  }, []);

  return (
    <div className="top-articles">
      <div className="top-articles-div">
        <Title title="پیشنهادی" />
        {posts.map((post) => (
          <div className="top-article">
            <Link to={`post/${post.id}`}>
              <img
                className="top-article-img"
                src={`http://127.0.0.1:8000${post.image}`}
                alt={post.title}
              />
              <div className="top-article-context">
                <h2>{post.title}</h2>
              </div>
              <div className="top-article-info">
                <div className="top-article-info-wrapper">
                  <div className="top-article-date-wrapper">
                    <img src="/assets/date.png" alt="" />
                    <p>{post.created}</p>
                  </div>
                  <div className="top-article-time-wrapper">
                    <img src="/assets/clock10.png" alt="" />
                    <p>مطالعه 10</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
        <OtherArticles />
      </div>
    </div>
  );
};

export default TopArticles;
