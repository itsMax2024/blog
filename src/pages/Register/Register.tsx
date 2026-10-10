// components/Register.jsx
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setGeneralError("");

    const result = await register(formData);

    if (result.success) {
      navigate("/");
    } else {
      if (result.error && typeof result.error === "object") {
        setErrors(result.error);
        // If there's a non-field error (like password mismatch)
        if (result.error.non_field_errors) {
          setGeneralError(result.error.non_field_errors[0]);
        }
      } else if (typeof result.error === "string") {
        setGeneralError(result.error);
      } else {
        setGeneralError("Registration failed. Please try again.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="login">
      <div className="login-login">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-header">ثبت نام در سینماتیکس</h2>
          {generalError && <div className="register-error">{generalError}</div>}

          <label htmlFor="">نام کاربری</label>
          <input
            type="text"
            name="username"
            placeholder="نام کاربری"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? "error-input" : ""}
            required
          />
          {errors.username && (
            <div className="field-error">این نام کاربری در دسترس نیست</div>
          )}

          <label htmlFor="">ایمیل</label>
          <input
            type="email"
            name="email"
            placeholder="ایمیل"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="field-error">{errors.email[0]}</div>}

          <label htmlFor="">رمز عبور</label>
          <input
            type="password"
            name="password"
            placeholder="رمزعبور"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error-input" : ""}
            required
          />
          {errors.password && (
            <div className="field-error">{errors.password[0]}</div>
          )}

          <button className="login-btn" type="submit" disabled={loading}>
            <img src="/assets/right-icon-black.png" alt="" />
            {loading ? "تکمیل ثبت نام..." : "ثبت نام"}
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

export default Register;
