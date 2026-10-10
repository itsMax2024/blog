import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import TopPosts from "../../components/TopPosts/TopPosts";
import Chosen from "../../components/Chosen/Chosen";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../contexts/AuthContext";

const Home = () => {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={logout} />
      <Hero />
      <TopPosts />
      <Chosen />
      <Main />
      <Footer />
    </div>
  );
};

export default Home;
