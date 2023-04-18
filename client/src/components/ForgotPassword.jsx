import { useState, useEffect } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  return (
    <div>
      <form class="reset-form">
        <h1>Forgot your password?</h1>
        <label htmlFor="email-reset">Enter your email</label>
        <input type="email" id="email-reset"/>
        <button>Reset Password</button>
        <a href="/login">Back to login</a>
      </form>
    </div>
  );
};

export default ForgotPassword;
