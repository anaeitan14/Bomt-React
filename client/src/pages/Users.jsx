import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import instance from "./axios-instance";
import Navbar from "../components/Navbar";
import "./Users.css";
import "../components/buttons/Button.css";

const Users = () => {
  const [user, setUser] = useState("");
  const [manager, setManager] = useState("");
  const [showUser, setShowUser] = useState(false);
  const [showManager, setShowManager] = useState(false);


  const handleShow = () => {
    
  };

  const handleClose = () => {
    setUser("");
    setManager("");
  };

  const handleAddUser = async () => {
    const URL = "/addUser";

    try {
      const response = await instance.post(URL, user);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    handleClose();
  };

  const handleAddManager = async () => {
    const URL = "/addManager";

    try {
      const response = await instance.post(URL);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    handleClose();
  };

  return (
    <>
      <Navbar />
      <button className="custom-button" onClick={showUser}>
        Add user
      </button>
      <Modal show={showUser} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <InputGroup className="mb-3">
              <Form.Control
                onChange={(e) => {
                  setUser(e.target.value);
                }}
                placeholder="User email"
              />
            </InputGroup>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          <button onClick={handleAddUser}>Add</button>
        </Modal.Footer>
      </Modal>
      <button className="custom-button" onClick={showManager}>
        Add manager
      </button>
      <Modal show={showManager} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <InputGroup className="mb-3">
              <Form.Control
                onChange={(e) => {
                  setManager(e.target.value);
                }}
                placeholder="Manager email"
              />
            </InputGroup>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <button className="custom-button" onClick={handleClose}>
            Close
          </button>
          <button className="custom-button" onClick={handleAddManager}>
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Users;
