import React from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleUserChange = (e) => {
    setUsername(e.target.value);
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setGeneralError("");
    setErrors({});

    try {
      const result = await login(username, password);
      if (result.success) {
        navigate("/");
      } else {
        setGeneralError(result.error);
        if (
          result.error.includes("credentials") ||
          result.error.includes("active account")
        ) {
          setErrors({ username: true, password: true });
        }
      }
    } catch (unexpectedError) {
      // This should never happen if login always returns an object
      console.error("Unexpected error during login", unexpectedError);
      setGeneralError("خطای غیرمنتظره. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-login">
        <form className="login-form" onSubmit={handleSubmit}>
          <p className="login-header">ورود کاربر</p>
          {generalError && <div className="error">{generalError}</div>}
          <button type="button" className="google-login-btn">
            <img src="/assets/Google__G__logo.png" alt="" /> Continue with
            Google
          </button>
          <p>یا</p>
          <label htmlFor="">نام کاربری</label>
          <input
            type="text"
            placeholder="max@email.com"
            value={username}
            onChange={handleUserChange}
            className={errors.username ? "error-input" : ""}
            required
          />
          {errors.username & errors.password && (
            <div className="field-error">نام کاربری یا رمز عبور اشتباه است</div>
          )}

          <label htmlFor="">رمز عبور</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={handlePasswordChange}
            className={errors.password ? "error-input" : ""}
            required
          />

          <button className="login-btn" type="submit" disabled={loading}>
            <img src="/assets/right-icon-black.png" alt="" />
            {loading ? "در حال ورود" : "ورود"}
          </button>
        </form>
        <a className="login-link" href="#">
          بازنشانی کلمه عبور
        </a>
        <p>
          حسابی ندارید؟{" "}
          <a className="login-link" href="/register">
            ساختن حساب جدید
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
