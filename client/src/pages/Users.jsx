import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import instance from "./axios-instance";
import Navbar from "../components/Navbar";

const Users = () => {
  const [user, setUser] = useState("");
  const [manager, setManager] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleClose = () => {
    setUser("");
    setShow(false);
  };

  const handleAddUser = async () => {
    const URL = "/addUser";

    try {
      const response = await instance.post(URL);
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
      <button onClick={handleShow}>
        Add user
      </button>
      <Modal show={show} onHide={handleClose}>
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
                placeholder="Product ID"
              />
            </InputGroup>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <button  onClick={handleClose}>
            Close
          </button>
          <button  onClick={handleAddUser}>
            Add
          </button>
        </Modal.Footer>
      </Modal>
      <button onClick={handleShow}>
        Add manager
      </button>
      <Modal show={show} onHide={handleClose}>
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
                placeholder="Product ID"
              />
            </InputGroup>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>
            Close
          </button>
          <button onClick={handleAddManager}>
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Users;
