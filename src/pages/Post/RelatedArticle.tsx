import React, { useEffect, useState } from "react";
import "./Post.css";
import Title from "../../components/Title/Title";
import { Link, useParams } from "react-router-dom";
import { getSimilar } from "../../api";

const RelatedArticle = () => {
  type posts = {
    id: string;
    title: string;
    description: string;
    image: string;
  };

  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getSimilar(id);
        setPosts(allPosts);
      } catch (err) {
        console.log(err);
      }
    };
    loadPosts();
  }, []);

  return (
    <div className="related-section">
      <Title title="مقاله های مرتبط" />
      <div className="related-articles">
        {posts.map((post) => (
          <a href={`/post/${post.id}`}>
            <div className="related-article">
              <img
                src={`http://127.0.0.1:8000${post.image}`}
                alt={post.title}
              />
              <h3>{post.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticle;
