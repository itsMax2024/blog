import React, { useState } from "react";
import "./Navbar.css";
import { getSearched } from "../../api";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleLogout = () => {
    onLogout();
    navigate("/#");
  };

  const search = async () => {
    const data = await getSearched(query);
    setResults(data);
  };

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
            <span>Cinemati</span>X
          </a>
          <ul className="nav-list">
            <li className="nav-item order-5">
              <a href="/">
                <img src="/assets/home.png" alt="" />
                خانه
              </a>
            </li>
            <li className="order-4">
              <div className="nav-item order-4">
                <a href="/topics/1">
                  <img src="/assets/gaming.png" alt="" />
                  بازی
                </a>
                <div className="drop-down drop-down-4">
                  <li>
                    <a href="">ماجراجویی</a>
                  </li>
                  <li>
                    <a href="">استراتژیک</a>
                  </li>
                  <li>
                    <a href="">داستانی</a>
                  </li>
                  <li>
                    <a href="">FPS</a>
                  </li>
                </div>
              </div>
            </li>
            <li className="nav-item order-3">
              <div className="nav-item order-3">
                <a href="/topics/3">
                  <img src="/assets/movie.png" alt="" />
                  سینما و تلوزیون
                </a>
                <div className="drop-down drop-down-3">
                  <li>
                    <a href="">فیلم</a>
                  </li>
                  <li>
                    <a href="">سریال</a>
                  </li>
                  <li>
                    <a href="">سینمای کلاسیک</a>
                  </li>
                  <li>
                    <a href="">اخبار</a>
                  </li>
                </div>
              </div>
            </li>

            <li className="nav-item order-2">
              <a href="/topics/2">
                <img src="/assets/book.png" alt="" />
                کتاب
              </a>
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
          {isAuthenticated ? (
            <>
              <button onClick={handleLogout} className="nav-logout-btn">
                <img src="/assets/logout.png" alt="" />
              </button>
              <a href="">
                <img src="" alt="" />
              </a>
              <span className="nav-user-name">خوش آمدید، {user?.username}</span>
            </>
          ) : (
            <a href="/login">
              <img src="/assets/login.png" alt="" />
            </a>
          )}
        </div>
      </div>
      <div className={`search ${show ? "show" : ""}`}>
        <form method="get" action="/search/">
          <input
            type="text"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جسنجو"
          />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
