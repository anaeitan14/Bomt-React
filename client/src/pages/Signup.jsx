import { useState } from "react";
import instance from "./axios-instance";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const info = { email: email, password: password };

    const URL = "/register";
    try {
      const response = await instance.post(URL, info);
      if (response.status === 200) {
        navigate("/login"); // Navigate to the '/login' page
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Incorrect information");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Create account</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="signup-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="signup-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="repeatPassword">Repeat Password</label>
            <input
              type="password"
              id="repeatPassword"
              className="signup-input"
              placeholder="Repeat your password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Create account
          </button>
          <a href="/login" className="login-link">
            Back to login
          </a>
        </form>
        {errorMessage && <div id="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Signup;
