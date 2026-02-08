import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login">
      <div className="login-login">
        <form action="POST" className="login-form">
          <p className="login-header">ورود کاربر</p>
          <a className="google-login-btn">
            <img src="/assets/Google__G__logo.png" alt="" /> Continue with
            Google
          </a>
          <p>یا</p>
          <label htmlFor="">نام کاربری</label>
          <input type="text" placeholder="max@email.com" />
          <label htmlFor="">رمز عبور</label>
          <input type="text" placeholder="********" />
          <button className="login-btn">
            <img src="/assets/right-icon-black.png" alt="" />
            ورود
          </button>
        </form>
        <a className="login-link" href="#">
          بازنشانی کلمه عبور
        </a>
        <p>
          حسابی ندارید؟{" "}
          <a className="login-link" href="">
            ساختن حساب جدید
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
