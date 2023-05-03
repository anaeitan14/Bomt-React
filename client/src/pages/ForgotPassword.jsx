import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setForgotEmail] = useState("");

  return (
    <div className="container-fluid">
      <form class="reset-form">
        <h1>Forgot your password?</h1>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">***</InputGroup.Text>
          <Form.Control
            onChange={(e) => {
              setForgotEmail(e.target.value);
            }}
            placeholder="Password"
            aria-label="Password"
            aria-describedby="Password"
          />
        </InputGroup>
        <button>Reset Password</button>
        <a href="/login">Back to login</a>
      </form>
    </div>
  );
};

export default ForgotPassword;
