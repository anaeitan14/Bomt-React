import "./Login.css";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchData = () => {
    return fetch("http://172.20.26.41:5000/api")
      .then((response) => response.json())
      .then((data) => console.log(JSON.stringify(data)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = { email, password };
    fetch("https://echo.zuplo.io/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(token),
    })
      .then((response) => response.json())
      .then((data) => console.log(data.body));
    return true;
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
      size: "medium",
    });

    google.accounts.id.prompt();
  }, []);

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Account login</h1>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>LOG IN</button>
        <a href="/signup">New user? click here to sign up</a>
        <a href="/forgot">Forgot password?</a>
        <div id="google-div"></div>
      </form>
    </div>
  );
};

export default Login;
