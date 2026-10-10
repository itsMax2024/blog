import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../components/Title/Title";
import "../../components/Main/main.css";
import { getPosts } from "../../api";
import { getNextPage } from "../../api";
import { getLastPage } from "../../api";
import "./NextPage.css";

const NextPosts = () => {
  type posts = {
    id: string;
    title: string;
    description: string;
    image: string;
  };

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getLastPage(page);
        setPosts(allPosts);
        setInitialLoadDone(true);
      } catch (err) {
        console.log(err);
      }
    };
    loadPosts();
  }, []);

  useEffect(() => {
    if (!initialLoadDone || page === 1) return;

    const loadMorePosts = async () => {
      setLoading(true);
      try {
        const newPosts = await getNextPage(page);

        if (newPosts && newPosts.length > 0) {
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
          // Optional: Check if fewer posts returned than expected (means no more posts)
          if (newPosts.length < 10) {
            // Assuming 10 posts per page
            setHasMore(false);
          }
        } else {
          setHasMore(false); // No more posts available
        }
      } catch (err) {
        console.log("Error loading more posts:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMorePosts();
  }, [page]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section className="next-page-section">
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
          {hasMore && (
            <span
              onClick={handleLoadMore}
              style={{ cursor: loading ? "wait" : "pointer" }}
            >
              <img src="/assets/back-icon.png" alt="" />
              <p>{loading ? "در حال بارگذاری..." : "مطالب بیشتر"}</p>
            </span>
          )}
          {!hasMore && posts.length > 0 && <p>هیچ مطلب دیگری وجود ندارد</p>}
        </div>
      </div>
    </section>
  );
};

export default NextPosts;
