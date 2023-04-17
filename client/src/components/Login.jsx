import "./Login.css";
import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import emailLogo from "../resources/icons/envelope.png";
import jwt_decode from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchData = () => {
    return fetch("http://172.20.26.41:5000/api")
      .then((response) => response.json())
      .then((data) => console.log(JSON.stringify(data)));
  };

  function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
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
      size: "large",
    });

    google.accounts.id.prompt();
    document.body.className = "body-login";
  }, []);

  return (
    <div>
      <form className="login-form">
        <h1>Welcome to BOMT</h1>
        <h2>Login</h2>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          className="email-input"
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="password-input"
          placeholder="Password"
        />
        <div className="login-buttons">
          <button>Login</button>
          <Link to="/signup">
            <button>Sign up</button>
          </Link>
          <Outlet />
        </div>
        <div className="forgot-password">
          <Link to="/forgot">
            <button>Forgot password?</button>
          </Link>
          <Outlet />
        </div>
        <div id="google-div"></div>
      </form>
    </div>
  );
};

export default Login;
