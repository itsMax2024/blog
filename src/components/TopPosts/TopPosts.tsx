import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TopPosts.css";
import { getPosts } from "../../api";
import { getLatestPosts } from "../../api";

const TopPosts = () => {
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

  return (
    <section className="top-posts">
      <div className="latest">
        {posts.map((post) => (
          <div className="latest-post" key={post.id}>
            <Link to={`/post/${post.id}`}>
              <img
                src={`http://127.0.0.1:8000${post.image}`}
                alt={post.title}
              />
              <div className="post-context">
                <h2>{post.title}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopPosts;
