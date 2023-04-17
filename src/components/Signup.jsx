import { useState, useEffect } from "react";
import "./Signup.css";

const Signup = () => {
  useEffect(() => {
    document.body.className = "body-signup";
  }, []);

  return (
    <div>
      <div className="signup-form-container">
        <h1>Create account</h1>
        <form className="signup-form">
          <label htmlFor="email-signup">Email</label>
          <input
            type="text"
            className="form-input"
            id="email-signup"
            placeholder="Email"
          />
          <label htmlFor="password-signup">Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="Password"
            id="password-signup"
          />
          <label htmlFor="passwordrepeat-signup">Repeat password</label>
          <input
            type="password"
            className="form-input"
            placeholder="Repeat password"
            id="passwordrepeat-signup"
          />
          <label htmlFor="firstname-signup">First name</label>
          <input
            type="text"
            className="form-input"
            placeholder="First name"
            id="firstname-signup"
          />
          <label htmlFor="lastname-signup">Last name</label>
          <input
            type="text"
            className="form-input"
            placeholder="Last name"
            id="lastname-signup"
          />
          <button id="signup-button">Create account</button>
          <a style={{ marginLeft: "9.5em" }} href="/login">
            Back to login
          </a>
        </form>
      </div>
    </div>
  );
};

export default Signup;
