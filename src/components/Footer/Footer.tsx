import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <section>
        <div className="footer-links">
          <ul>
            <li>
              <a href="">تماس با ما</a>
            </li>
            <li>
              <a href="">درباره ما</a>
            </li>
            <p>© کپی بدون مجوز مکتوب ممنوع است </p>
          </ul>
          <div className="footer-info">Developed by MaxCoding</div>
        </div>
        <div className="social-links">
          <img src="/assets/icon-instagram.svg" alt="" />
          <img src="/assets/icon-facebook.svg" alt="" />
          <img src="/assets/icon-twitter.svg" alt="" />
        </div>
      </section>
    </footer>
  );
};

export default Footer;
