import React, { useRef } from "react";
import "./Testemonials.css";
import next_icon from "../../assets/next-icon.png";
import back_icon from "../../assets/back-icon.png";
import user_1 from "../../assets/user-1.jpg";
import user_2 from "../../assets/user-2.png";
import user_3 from "../../assets/user-3.jpg";
import user_4 from "../../assets/user-4.png";

const Testemonials = () => {
  const slider = useRef();
  let tx = -50;

  const slideForward = () => {
    if (tx > -50) {
      tx -= 25;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  };

  const slideBackward = () => {
    if (tx < 0) {
      tx += 25;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  };
  return (
    <div className="container">
      <div className="testemonials">
        <img
          src={next_icon}
          alt=""
          className="next-btn"
          onClick={slideForward}
        />
        <img
          src={back_icon}
          alt=""
          className="back-btn"
          onClick={slideBackward}
        />
        <div className="slider">
          <ul ref={slider}>
            <li>
              <div className="slide">
                <div className="user-info">
                  <img src={user_1} alt="" />
                  <div>
                    <h3>Taylor Swift</h3>
                    <span>Edusity, USA</span>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                  illo sunt veritatis exercitationem delectus voluptatibus
                  corporis autem quae sapiente sed!
                </p>
              </div>
            </li>
            <li>
              <div className="slide">
                <div className="user-info">
                  <img src={user_2} alt="" />
                  <div>
                    <h3>Ellie Williams</h3>
                    <span>Edusity, USA</span>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                  illo sunt veritatis exercitationem delectus voluptatibus
                  corporis autem quae sapiente sed!
                </p>
              </div>
            </li>
            <li>
              <div className="slide">
                <div className="user-info">
                  <img src={user_3} alt="" />
                  <div>
                    <h3>Jinx</h3>
                    <span>Edusity, USA</span>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                  illo sunt veritatis exercitationem delectus voluptatibus
                  corporis autem quae sapiente sed!
                </p>
              </div>
            </li>
            <li>
              <div className="slide">
                <div className="user-info">
                  <img src={user_4} alt="" />
                  <div>
                    <h3>Ellie Miller</h3>
                    <span>Edusity, USA</span>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                  illo sunt veritatis exercitationem delectus voluptatibus
                  corporis autem quae sapiente sed!
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Testemonials;
