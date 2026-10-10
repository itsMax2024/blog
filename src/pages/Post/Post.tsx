import React, { useEffect, useState } from "react";
import { data } from "../../data/data";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Title from "../../components/Title/Title";
import { Link } from "react-router-dom";
import "./Post.css";
import RelatedArticle from "./RelatedArticle";
import Footer from "../../components/Footer/Footer";
import { getPosts, getLatestPosts } from "../../api";
import { getComments } from "../../api";
import { useAuth } from "../../contexts/AuthContext";
import { createComment, deleteComment } from "../../api";

const Post = () => {
  type posts = {
    id: string;
    title: string;
    description: string;
    image: string;
  };

  const [posts, setPosts] = useState([]);
  const [latest, setLatest] = useState([]);
  const [comments, setComments] = useState([]);
  const { isAuthenticated, user, logout } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getPosts();
        setPosts(allPosts);
      } catch (err) {
        console.log(err);
      }
    };
    loadPosts();
  }, []);
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getLatestPosts();
        setLatest(allPosts);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const allComments = await getComments(id);
        setComments(allComments);
      } catch (err) {
        console.log(err);
      }
    };
    loadComments();
  }, []);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const response = await createComment(id, commentText);
      // Add the new comment to the comments state
      setComments((prev) => [...prev, response.data]);
      setCommentText("");
      setError("");
    } catch (error) {
      setError("Failed to post comment. Please login first.");
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Delete this comment?")) {
      try {
        await deleteComment(commentId);
        // Remove the deleted comment from state
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  const post = posts.find((post) => post.id === Number(id));

  if (!post) return <div>Not Found</div>;
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={logout} />
      <div className="article-page">
        <section className="article-section">
          <div className="article-sidebar">
            <Title title="تازه ترین مطالب" />
            {latest.map((post) => (
              <div className="article-article">
                <Link to={`/post/${post.id}`}>
                  <img
                    src={`http://127.0.0.1:8000${post.image}`}
                    alt={post.title}
                  />
                  <div className="sidebar-article-info">
                    <p>{post.title}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="article">
            <article>
              <h1>{post.title}</h1>
              <div className="post-info">
                <div className="tags">
                  <p>اخبار</p>
                  <p>اخبار</p>
                  <p>اخبار</p>
                </div>
                <span className="created-time">{post.created}</span>
              </div>
              <div className="post-author">
                <img
                  src="/assets/gaming/avatar.png"
                  className="author-avatar"
                  alt=""
                />
                <span className="author">{post.author.username}</span>
              </div>
              <img
                className="article-main-img"
                src={`http://127.0.0.1:8000${post.image}`}
                alt={post.title}
              />
              <div className="post-context">
                <p className="post-description">{post.description}</p>

                <div
                  className="post-content"
                  dangerouslySetInnerHTML={{ __html: post.context }}
                />
              </div>
            </article>
            <RelatedArticle />
          </div>
        </section>
        <section className="comments-section">
          <div className="comments-title">
            <h4>دیدگاه شما</h4>
          </div>
          <h3 className="comments-length">دیدگاه ها ({comments.length})</h3>
          <p className="comments-length">نظرتون رو با بقیه به اشتراک بذارید!</p>

          {/* Comment Form - Only shows if logged in */}
          {isAuthenticated ? (
            <form onSubmit={handleSubmitComment} className="comment-form">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="نظرتان را بنویسید..."
                rows="3"
              />
              {error && <div className="error">{error}</div>}
              <button type="submit">ثبت دیدگاه</button>
            </form>
          ) : (
            <div className="login-prompt">
              <p>
                برای ثبت دیدگاه{" "}
                <Link to="/login" className="login-prompt-link">
                  وارد
                </Link>{" "}
                شوید
              </p>
            </div>
          )}
          <div className="comments-comments">
            <div className="comments">
              {comments.length === 0 ? (
                <p className="comments-length">
                  تا حالا نظری ثبت نشده. شما اولین نفر باشید!
                </p>
              ) : (
                comments.map((comment) => (
                  <div className="comment" key={comment.id}>
                    <div className="comment-profile">
                      <img
                        className="comment-profile-img"
                        src="/assets/user-1213.png"
                        alt="avatar"
                      />
                      <p>{comment.user.username}</p>
                      <span>
                        {new Date(comment.created).toLocaleDateString()}
                      </span>
                      {isAuthenticated && user?.id === comment.user.id && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="delete-comment"
                        >
                          حذف دیدگاه
                        </button>
                      )}
                    </div>
                    <div className="comment-body">
                      <p>{comment.body}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Post;
