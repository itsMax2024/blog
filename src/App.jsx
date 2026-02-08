import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import TopPosts from "./components/TopPosts/TopPosts";
import Chosen from "./components/Chosen/Chosen";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Post from "./pages/Post/Post";
import Login from "./pages/Login/Login";

const App = () => {
  const [playState, setPlayState] = useState(false);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/post/:id" element={<Post />} />
        <Route path="/login/" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
