import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <section>
        <div className="footer-links">
          <p>© All rights are reserved 2026.</p>
          <ul>
            <li>
              <a href="">Terms of Service</a>
            </li>
            <li>
              <a href="">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="footer-info">Developed by Max</div>
      </section>
    </footer>
  );
};

export default Footer;
