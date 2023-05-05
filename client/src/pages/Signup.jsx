import { useState, useEffect } from "react";
import "./Signup.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    const URL = "http://localhost:5000/api/register";

    axios
      .post(URL, {
        email: email,
        password: password,
      })
      .then(response => console.log(response))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="signup-form">
        <h1>Create account</h1>
        <form onSubmit={handleSubmit}>
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
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              aria-label="Password"
              aria-describedby="Password"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">***</InputGroup.Text>
            <Form.Control
              type="password"
              onChange={(e) => {
                setRepeatPassword(e.target.value);
              }}
              placeholder="Repeat Password"
              aria-label="Repeat Password"
              aria-describedby="Repeat Password"
            />
          </InputGroup>
          <button>Create account</button>
          <a href="/login">Back to login</a>
        </form>
      </div>
    </div>
  );
};

export default Signup;
