import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useAuth } from "../../contexts/AuthContext";
import Profile from "../../components/Profile/Profile";

const ProfilePage = () => {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <section>
      <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={logout} />
      <Profile />
    </section>
  );
};

export default ProfilePage;
