import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getPost, getUserProfile } from "../../api";
import "./Profile.css";
import { deleteComment } from "../../api";

const Profile = () => {
  const { isAuthenticated, user } = useAuth();

  const [userProfile, setUserProfile] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const profile = await getUserProfile(user.id);

        setUserProfile(profile);
        setComments(profile.comments ?? []);
      } catch (err) {
        console.error(err);
        setError("Could not load your profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [isAuthenticated, user?.id]);
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

  if (!isAuthenticated) {
    return (
      <div className="profile-section">
        <div className="profile-not-found">
          <h2>برای دیدن پروفایل خود، لطفا وارد شوید</h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="profile-section">بارگذاری...</div>;
  }

  if (error) {
    return <div className="profile-section">{error}</div>;
  }

  return (
    <div className="profile-section profile-page">
      <div className="user-profile">
        <img
          className="profile-avatar"
          src="/assets/user-1213.png"
          alt="Profile avatar"
        />

        <h1>خوش آمدید</h1>
        <h2>{userProfile?.username ?? user.username}</h2>

        <h3>دیدگاه های شما ({comments.length})</h3>

        {comments.length === 0 ? (
          <p>You haven't posted any comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <div className="comment-profile">
                <img
                  className="comment-profile-img"
                  src="/assets/user-1213.png"
                  alt=""
                />

                <p>{userProfile?.username ?? user.username}</p>

                <span>
                  {comment.created
                    ? new Date(comment.created).toLocaleDateString()
                    : ""}
                </span>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="delete-comment"
                >
                  <img src="/assets/delete.svg" alt="" />
                </button>
              </div>
              <div className="profile-comment-post">
                <span>دیدگاه برای</span>

                <a href={`/post/${comment.post}`}>{comment.post_title}</a>
              </div>

              <div className="comment-body">
                <p>{comment.body}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
