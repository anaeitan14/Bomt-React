import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";

const AddBtn = () => {
  const [ProductID, setProductID] = useState("");
  const [ProductName, setProductName] = useState("");
  const [Description, setDescription] = useState("");
  const [BuyMake, setBuyMake] = useState("");
  const [Manufacturer, setManufacturer] = useState("");
  const [ManufacturerID, setManufacturerID] = useState("");
  const [DistributorName, setDistributorName] = useState("");
  const [DistributorID, setDistributorID] = useState("");
  const [DocumentType, setDocumentType] = useState("");
  const [DocumentLocation, setDocumentLocation] = useState("");
  const [TreeAvailable, setTreeAvailable] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = () => {
    const URL = "http://localhost:5000/api/addItem";

    axios.post(URL, {
      item: {
        ProductID: ProductID,
        ProductName: ProductName,
        Description: Description,
        BuyMake: BuyMake,
        Manufacturer: Manufacturer,
        ManufacturerID: ManufacturerID,
        DistributorName: DistributorName,
        DistributorID: DistributorID,
        DocumentType: DocumentType,
        DocumentLocation: DocumentLocation,
        TreeAvailable: TreeAvailable,
      },
    });
  };

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
              <Form.Control
                onChange={(e) => {
                  setProductID(e.target.value);
                }}
                placeholder="Product ID"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Control
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
                placeholder="Product Name"
              />
            </InputGroup>
            <InputGroup className="mb-3">
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
            </Form.Select>
            <InputGroup className="mb-3">
              <Form.Control
                onChange={(e) => {
                  setManufacturer(e.target.value);
                }}
                placeholder="Manufacturer"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Control
                onChange={(e) => {
                  setManufacturerID(e.target.value);
                }}
                placeholder="Manufacturer ID"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Control
                onChange={(e) => {
                  setDistributorName(e.target.value);
                }}
                placeholder="Distributor Name"
              />
              <Form.Control
                onChange={(e) => {
                  setDistributorID(e.target.value);
                }}
                placeholder="Distributor ID"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Control
                onChange={(e) => {
                  setDocumentType(e.target.value);
                }}
                placeholder="Document Type"
              />
              <Form.Control
                onChange={(e) => {
                  setDocumentLocation(e.target.value);
                }}
                placeholder="Document Location"
              />
            </InputGroup>
            <Form.Select
              className="mb-3"
              onChange={(e) => setTreeAvailable(e.target.value)}
            >
              <Form.Label>Is tree</Form.Label>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAdd}>
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
