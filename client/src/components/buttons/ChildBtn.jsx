import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import instance from "../../pages/axios-instance";

const ChildBtn = ({data}) => {
  const [products, setProducts] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleClose = () => {
    setProducts("");
    setShow(false);
  };

  const handleAdd = async () => {
    const URL = "/addChild";
    let pids = [];
    console.log(pids);

    if (!data) {
      alert("Cannot add a child item to this item");
    } 

    if(products.length > 0) {
      pids = products.split(" ");
      console.log(pids);
    } else {
      alert("Must enter a PID for the child item");
    }

    const item = {
      pid: data,
      pids: pids
    };

    setProducts("");

    try {
      const response = await instance.post(URL, item );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add childs
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
                  setProducts(e.target.value);
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

export default ChildBtn;
