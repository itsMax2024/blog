import React, { useEffect, useState } from "react";
import "./Navbar.css";

import { Link, Element } from "react-scroll";
import menu_icon from "../../assets/menu-icon.png";

const Navbar = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 500 ? setSticky(true) : setSticky(false);
    });
  }, []);

  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    menu ? setMenu(false) : setMenu(true);
  };

  const [darkmode, setDarkmode] = useState(false);

  const disableDarkMode = () => {
    document.body.classList.remove("darkmode");
    setDarkmode(false);
    console.log("dark mode off");
  };

  const enableDarkMode = () => {
    document.body.classList.add("darkmode");
    setDarkmode(true);
    console.log("dark mode on");
  };

  return (
    <nav>
      <div className={`nav container ${sticky ? "dark-nav" : ""}`}>
        <p className="logo">Astrid</p>
        <ul className={menu ? "" : "hide-menu"}>
          <li>
            <Link to="hero" smooth={true} duration={500} offset={0}>
              Home
            </Link>
          </li>
          <li>
            <Link to="programs" smooth={true} duration={500} offset={-260}>
              Programs
            </Link>
          </li>
          <li>
            <Link to="about" smooth={true} duration={500} offset={-150}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="campus" smooth={true} duration={500} offset={-270}>
              Campus
            </Link>
          </li>
          <li>
            <Link to="testemonials" smooth={true} duration={500} offset={-260}>
              Testemonials
            </Link>
          </li>
          <li>
            <Link
              to="contact"
              smooth={true}
              duration={500}
              offset={-260}
              className="btn"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <button
              id="theme-switch"
              className="dark-btn"
              onClick={darkmode === false ? enableDarkMode : disableDarkMode}
            >
              {darkmode ? "🌑" : "☀"}
            </button>
          </li>
        </ul>
        <img
          src={menu_icon}
          alt=""
          className="menu-icon"
          onClick={toggleMenu}
        />
      </div>
    </nav>
  );
};

export default Navbar;
