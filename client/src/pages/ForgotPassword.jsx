import { useState, useEffect } from "react";
import instance from "./axios-instance";
import "../index.css";

const ForgotPassword = () => {
  const [email, setForgotEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      if (message) {
        setMessage("");
      }
    }, 2500);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
    };

    const URL = "/forgot-password";

    try {
      const response = await instance.post(URL, data);
      if (response.status === 200) {
        setMessage("Reset password email sent!");
        console.log(message);
      }
    } catch (err) {
      setMessage("Email doesn't exist");
    }
  };

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h1>Forgot your password?</h1>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="forgot-password-input"
            onChange={(e) => {
              setForgotEmail(e.target.value);
            }}
            placeholder="Enter your email"
            required
          />
        </div>
        <button type="submit" className="forgot-password-button">
          Reset Password
        </button>
        <a href="/login" className="forgot-password-link">
          Back to login
        </a>
        {message && <div id="error-message">{message}</div>}
      </form>
    </div>
  );
};

export default ForgotPassword;
