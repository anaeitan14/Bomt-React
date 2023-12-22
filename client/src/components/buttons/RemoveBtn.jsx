import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import instance from "../../pages/axios-instance";
import "./Button.css";

const RemoveBtn = () => {
  const [show, setShow] = useState(false);
  const [PNID, setPNID] = useState("");

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setPNID("");
    setShow(false);
  };

  const removeItem = async () => {
    const URL = "/removeItem";

    const item = {
      pid: PNID,
      email: localStorage.getItem("email"),
    };

    try {
      const response = await instance.post(URL, item);
      alert("Item removed succesfully");
    } catch (e) {
      alert("Item removal failed, maybe it does not exist");
    }
    setPNID("");
    handleClose();
  };

  return (
    <>
      <button className="custom-button" onClick={handleShow}>
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
          <button className="custom-button" onClick={handleClose}>
            Close
          </button>
          <button className="custom-button" onClick={removeItem}>
            Remove
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveBtn;
