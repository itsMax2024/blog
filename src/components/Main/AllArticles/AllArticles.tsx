import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../Title/Title";
import "../Main.css";
import { getPosts } from "../../../api";
import { getLastPage } from "../../../api";
import NextPage from "../../../pages/NextPage/NextPage";

const AllArticles = () => {
  type posts = {
    id: string;
    title: string;
    description: string;
    image: string;
  };

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getLastPage(1);
        setPosts(allPosts);
      } catch (err) {
        console.log(err);
      }
    };
    loadPosts();
  }, []);

  useEffect(() => {
    const nextPage = () => {
      setPage((prev) => prev + 1);
      console.log(page);
    };
  }, []);

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
                <p>{article.created}</p>
              </div>
            </div>
            <div className="article-img">
              <img
                src={`http://127.0.0.1:8000${article.image}`}
                alt={article.title}
              />
            </div>
          </Link>
        </div>
      ))}
      <div className="next-page">
        <Link to={"page/next-page"}>
          <span>
            <img src="/assets/back-icon.png" alt="" />
            <p>مطالب بیشتر</p>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default AllArticles;
