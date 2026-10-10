import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../../api";
import { getLatestPosts } from "../../api";

import "./Hero.css";

const Hero = () => {
  type posts = {
    id: string;
    title: string;
    description: string;
    image: string;
  };

  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getLatestPosts();
        setPosts(allPosts);
      } catch (err) {
        console.log(err);
      }
    };
    loadPosts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % posts.length);
      console.log(setIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [posts]);

  return (
    <section className="hero">
      <div
        className="slider-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {posts.map((post) => (
          <div className="slide" key={post.id}>
            <img
              className="slide-img-bg"
              src={`http://127.0.0.1:8000${post.image}`}
              alt={post.title}
            />

            <Link to={`/post/${post.id}`}>
              <img
                className="slide-img"
                src={`http://127.0.0.1:8000${post.image}`}
                alt={post.title}
              />
            </Link>

            <div className="slide-content">
              <Link to={`/post/${post.id}`}>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
              </Link>
              <a className="read-more" href={`/post/${post.id}`}>
                <p>مرور مطلب</p>
                <img src="/assets/arrow-back.png" alt="" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="slider-dots">
        {posts.map((_, i) => (
          <button
            key={i}
            className={i === index ? "active" : ""}
            onClick={() => {
              setIndex(i);
            }}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
