import instance from "./axios-instance";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const URL = "/login";

    const info = {
      email: email,
      password: password,
    };

    try {
      const response = await instance.post(URL, info);
      if (response.data.auth === true) {
        localStorage.setItem("email", email);
        localStorage.setItem("Queries", "");
        navigate("/table-select"); // Navigate to the '/table-select' page
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Incorrect information");
    }
  };

  async function handleCallbackResponse(response) {
    var userObject = response.credential;

    const URL = "http://localhost:5000/api/google-register";

    try {
      const response = await instance.post(URL, { JWT: userObject });
      if (response.status === 200) {
        localStorage.setItem("email", userObject.email);
        localStorage.setItem("Queries", "");
        navigate("/table-select");
      }
    } catch (err) {
      setErrorMessage("Incorrect information");
    }
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "629491949981-6dlq72o30aiv6ba91mu9jgcvbh4tfd9h.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("google-div"), {
      theme: "outline",
      size: "medium",
    });

    google.accounts.id.prompt();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (errorMessage) {
        setErrorMessage("");
      }
    }, 2500);
  });

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-heading">BOMT - Login</h1>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="login-input"
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
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="login-button">Sign in</button>
        <a href="/signup" className="login-link">
          New user? Click here to sign up
        </a>
        <a href="/forgot" className="login-link">
          Forgot password?
        </a>
        <div id="google-div" className="google-button"></div>
        {errorMessage && <div id="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
};
export default Login;
