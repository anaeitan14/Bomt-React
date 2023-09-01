import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";

const RemoveBtn = () => {
  const [show, setShow] = useState(false);
  const [PNID, setPNID] = useState("");

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setPNID("");
    setShow(false);
  };

  const removeItem = () => {
    const URL = "http://localhost:5000/api/removeItem";

    const item = {
      pid: PNID,
      email:localStorage.getItem("email")
    };

    axios
      .post(URL, item)
      .then((response) => response.json())
      .then((data) => console.log(data));

    setPNID("");
    handleClose();
  };

  return (
    <>
      <button onClick={handleShow}>
        Remove item
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control
              onChange={(e) => {
                setPNID(e.target.value);
              }}
              placeholder="PNID"
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>
            Close
          </button>
          <button onClick={removeItem}>
            Remove
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveBtn;
