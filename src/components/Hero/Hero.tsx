import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Hero.css";

const Hero = () => {
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
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % posts.length);
      console.log(setIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div
        className="slider-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {posts.map((post) => (
          <div className="slide" key={post.id}>
            <Link to={`/post/${post.id}`}>
              <img src={post.image} alt={post.title} />
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
