import { useState, useEffect } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  useEffect(() => {
    document.body.className = "body-forgot";
  }, []);

  return (
    <div>
      <form id="reset-form">
        <h1>Forgot your password?</h1>
        <input type="email" placeholder="Email" className="form-input" />
        <button id="reset-button">Reset Password</button>
        <a href="/login">Back to login</a>
      </form>
    </div>
  );
};

export default ForgotPassword;
