import React, { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Post from "./pages/Post/Post";
import Login from "./pages/Login/Login";
import Search from "./pages/Home/Search";
import Topics from "./pages/Topics/Topics";
import NextPage from "./pages/NextPage/NextPage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Register from "./pages/Register/Register";

const App = () => {
  const [playState, setPlayState] = useState(false);

  return (
    <div className="app">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/register/" element={<Register />} />
          <Route path="/search/" element={<Search />} />
          <Route path="/topics/:id" element={<Topics />} />
          <Route path="page/next-page" element={<NextPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
