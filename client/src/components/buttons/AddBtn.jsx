import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const AddBtn = () => {
  const [show, setShow] = useState(false);
  const [PN, setPN] = useState("");
  const [PNID, setPNID] = useState("");
  const [description, setDescription] = useState("");
  const [MFR, setMFR] = useState("");
  const [MFRPN, setMFRPN] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add item
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                &#x1F50E;&#xFE0E;
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => {
                  setPN(e.target.value);
                }}
                placeholder="PN"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                &#x1F50E;&#xFE0E;
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => {
                  setPNID(e.target.value);
                }}
                placeholder="PN ID"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                &#x1F50E;&#xFE0E;
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="Description"
              />
            </InputGroup>

            <Form.Select className="mb-3">
              <Form.Label>Type</Form.Label>
              <option value="Buy">Buy</option>
              <option value="Make">Make</option>
              <option value="Document">Document</option>
            </Form.Select>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                &#x1F50E;&#xFE0E;
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => {
                  setMFR(e.target.value);
                }}
                placeholder="MFR"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                &#x1F50E;&#xFE0E;
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => {
                  setMFRPN(e.target.value);
                }}
                placeholder="MFR PN"
              />
            </InputGroup>
            <Form.Select className="mb-3">
              <Form.Label>Is tree</Form.Label>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddBtn;
