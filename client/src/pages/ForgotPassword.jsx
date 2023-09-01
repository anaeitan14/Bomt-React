import { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";

const ForgotPassword = () => {
  const [email, setForgotEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
    };

    const URL = "";

    axios.post(URL, data);
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
      </form>
    </div>
  );
};

export default ForgotPassword;
