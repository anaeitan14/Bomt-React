import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import instance from "../../pages/axios-instance";

const AddBtn = () => {
  const [productID, setProductID] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleClose = () => {
    setProductID("");
    setShow(false);
  };

  const handleAdd = async () => {
    const URL = "/addChild";

    const item = {
      ProductID: productID,
    };

    setProductID("");

    try {
      const response = await instance.post(URL, { item });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add child
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <InputGroup className="mb-3">
              <Form.Control
                onChange={(e) => {
                  setProductID(e.target.value);
                }}
                placeholder="Product ID"
              />
            </InputGroup>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddBtn;
