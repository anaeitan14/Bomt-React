import { useState, useEffect } from "react";
import "./Signup.css";

const Signup = () => {
  return (
    <div>
      <div className="signup-form">
        <h1>Create account</h1>
        <form>
          <label htmlFor="email-signup">Email</label>
          <input type="text" id="email-signup" />
          <label htmlFor="password-signup">Password</label>
          <input type="password" id="password-signup" />
          <label htmlFor="passwordrepeat-signup">Repeat password</label>
          <input type="password" id="passwordrepeat-signup" />
          <label htmlFor="firstname-signup">First name</label>
          <input type="text" id="firstname-signup" />
          <label htmlFor="lastname-signup">Last name</label>
          <input type="text" id="lastname-signup" />
          <button>Create account</button>
          <a href="/login">Back to login</a>
        </form>
      </div>
    </div>
  );
};

export default Signup;
