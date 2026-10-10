import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./OtherArticles.css";
import { getPosts } from "../../../../api";
import { getLatestPosts } from "../../../../api";
import { getRecommended } from "../../../../api";

const OtherArticles = () => {
  type posts = {
    id: string;
    title: string;
    description: string;
    image: string;
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getRecommended();
        setPosts(allPosts);
      } catch (err) {
        console.log(err);
      }
    };
    loadPosts();
  }, []);

  return (
    <div className="other-top-articles">
      {posts.map((post) => (
        <div className="other-top-article">
          <Link to={`post/${post.id}`}>
            <img
              className="other-top-article-img"
              src={`http://127.0.0.1:8000${post.image}`}
              alt={post.title}
            />
            <div className="other-top-article-context">
              <h2>{post.title}</h2>
            </div>
            <div className="other-top-article-info">
              <div className="other-top-article-info-wrapper">
                <div className="other-top-article-date-wrapper">
                  <img src="/assets/date.png" alt="" />
                  <p>{post.created}</p>
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
