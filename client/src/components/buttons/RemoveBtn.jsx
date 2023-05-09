import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";

const RemoveBtn = () => {
  const [show, setShow] = useState(false);
  const [PNID, setPNID] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const removeItem = () => {
    const URL = "http://localhost:5000/api/removeItem";

    const item = {
      pid: PNID,
    };

    axios
      .post(URL, item)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Remove item
      </Button>

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
              aria-label="PNID"
              aria-describedby="PNID"
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={removeItem}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveBtn;
