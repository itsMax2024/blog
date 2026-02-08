import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const activeSearchbar = () => {
    if (show) {
      setShow(false);
    }
    if (!show) {
      setShow(true);
    }
  };

  return (
    <nav>
      <div className="nav-links">
        <div className="nav-nav">
          <a className="nav-logo" href="/">
            <span>Max</span>Gaming
          </a>
          <ul className="nav-list">
            <li className="nav-item order-5">
              <img src="/assets/home.png" alt="" />
              خانه
            </li>
            <li className="nav-item order-4">
              <img src="/assets/gaming.png" alt="" />
              بازی
            </li>
            <li className="nav-item order-3">
              <img src="/assets/movie.png" alt="" />
              سینما و تلوزیون
            </li>
            <li className="nav-item order-2">
              <img src="/assets/book.png" alt="" />
              کتاب
            </li>
            <li className="nav-item order-1">
              <button onClick={activeSearchbar}>
                <img src="/assets/search.png" alt="" />
                جستجو
              </button>
            </li>
          </ul>
        </div>

        <div className="nav-user">
          <a href="">
            <img src="/assets/dark.png" alt="" />
          </a>
          <a href="/login">
            <img src="/assets/login.png" alt="" />
          </a>
        </div>
      </div>
      <div className={`search ${show ? "show" : ""}`}>
        <form action="get">
          <input type="text" placeholder="جسنجو" />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
