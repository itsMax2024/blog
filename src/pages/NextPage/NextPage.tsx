import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AllArticles from "../../components/Main/AllArticles/AllArticles";
import NextPosts from "./NextPosts";
import { useAuth } from "../../contexts/AuthContext";

const NextPage = () => {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={logout} />
      <NextPosts />
      <Footer />
    </div>
  );
};

export default NextPage;
