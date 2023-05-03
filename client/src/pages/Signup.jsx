import { useState, useEffect } from "react";
import "./Signup.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Signup = () => {
  return (
    <div className="container-fluid">
      <div className="signup-form">
        <h1>Create account</h1>
        <form>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            onChange={(e) => {
            
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
             
            }}
            placeholder="Password"
            aria-label="Password"
            aria-describedby="Password"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">***</InputGroup.Text>
          <Form.Control
            onChange={(e) => {
            
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
