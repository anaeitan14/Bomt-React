import "./Login.css";
import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const fetchData = () => {
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const URL = "http://localhost:5000/api/signup";

    axios
      .post(URL, {
        email: email,
        password: password,
      })
      .then()
      .catch(error => console.log(error));

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
    <div className="container-fluid">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Account login</h1>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            aria-label="Email"
            aria-describedby="Email"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">***</InputGroup.Text>
          <Form.Control
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="Password"
          />
        </InputGroup>
        <button>LOG IN</button>
        <a href="/signup">New user? click here to sign up</a>
        <a href="/forgot">Forgot password?</a>
        <div id="google-div"></div>
      </form>
      {error}
    </div>
  );
};

export default Login;
