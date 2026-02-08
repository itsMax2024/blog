import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import TopPosts from "../../components/TopPosts/TopPosts";
import Chosen from "../../components/Chosen/Chosen";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <TopPosts />
      <Chosen />
      <Main />
      <Footer />
    </div>
  );
};

export default Home;
