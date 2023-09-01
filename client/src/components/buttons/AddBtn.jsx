import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import instance from "../../pages/axios-instance";

const AddBtn = () => {
  const [productID, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [buyMake, setBuyMake] = useState("Buy");
  const [manufacturer, setManufacturer] = useState("");
  const [manufacturerID, setManufacturerID] = useState("");
  const [treeAvailable, setTreeAvailable] = useState(false);
  const [distCount, setDistCount] = useState(0);
  const [docCount, setDocCount] = useState(0);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [distriInputs, setDistriInputs] = useState({});
  const [docuInputs, setDocuInputs] = useState({});

  const handleClose = () => {
    setProductID("");
    setProductName("");
    setDescription("");
    setBuyMake("Buy");
    setManufacturer("");
    setManufacturerID("");
    setTreeAvailable(false);
    setDistCount(0);
    setDocCount(0);
    setDistriInputs({});
    setDocuInputs({});
    setShow(false);
  };
  const handleOnChangeDistri = (event) => {
    const { name, value } = event.target;
    setDistriInputs({ ...distriInputs, [name]: value });
  };

  const handleOnChangeDocs = (event) => {
    const { name, value } = event.target;
    setDocuInputs({ ...docuInputs, [name]: value });
  };

  const seperateObj = (obj) => {
    const res = [];
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i += 2) {
      res.push({
        DistrobutorName: obj[keys[i + 1]],
        DistrobutorID: obj[keys[i]],
      });
    }
    return res;
  };

  const seperateDoc = (obj) => {
    const res = [];
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i += 2) {
      res.push({
        DocumentType: obj[keys[i]],
        DocumentLocation: obj[keys[i + 1]],
      });
    }
    return res;
  };

  const distInputs = [];
  for (let i = 0; i < distCount; i++) {
    let distID = "distID" + (i + 1);
    let distID2 = "Distributor ID " + (i + 1);
    let distName = "distName" + (i + 1);
    let distName2 = "Distributor Name " + (i + 1);
    distInputs.push(
      <InputGroup className="mb-3">
        <Form.Control
          onChange={handleOnChangeDistri}
          placeholder={distID2}
          name={distID}
          defaultValue=""
        />
        <Form.Control
          onChange={handleOnChangeDistri}
          placeholder={distName2}
          name={distName}
          defaultValue=""
        />
      </InputGroup>
    );
  }

  const docInputs = [];
  for (let i = 0; i < docCount; i++) {
    let docType = "docType" + (i + 1);
    let docType2 = "Document Type " + (i + 1);
    let docLoc = "docLoc" + (i + 1);
    let docLoc2 = "Document Location " + (i + 1);
    docInputs.push(
      <InputGroup className="mb-3">
        <Form.Control
          onChange={handleOnChangeDocs}
          placeholder={docType2}
          name={docType}
          defaultValue=""
        />
        <Form.Control
          onChange={handleOnChangeDocs}
          placeholder={docLoc2}
          name={docLoc}
          defaultValue=""
        />
      </InputGroup>
    );
  }

  const handleAdd = () => {
    const URL = "/addItem";

    const dis = seperateObj(distriInputs);
    const doc = seperateDoc(docuInputs);

    const item = {
      ProductID: productID,
      ProductName: productName,
      Description: description,
      BuyMake: buyMake,
      Manufacturer: manufacturer,
      ManufacturerID: manufacturerID,
      Distrobutor: dis,
      Document: doc,
      TreeAvailable: treeAvailable,
      email: localStorage.getItem("email"),
    };

    setProductID("");
    setProductName("");
    setDescription("");
    setBuyMake("");
    setManufacturer("");
    setManufacturerID("");
    setTreeAvailable(false);
    setDistCount(0);
    setDocCount(0);
    setDistriInputs({});
    setDocuInputs({});

    instance
      .post(URL, { item })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
  };

  return (
    <>
      <button onClick={handleShow}>
        Add item
      </button>
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
            <Form.Label>Type</Form.Label>
            <Form.Select
              className="mb-3"
              onChange={(e) => {
                setBuyMake(e.target.value);
              }}
            >
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
            <select
              className="form-select form-select-lg mb-3"
              onChange={(e) => setDocCount(e.target.value)}
            >
              <option selected>Select the number of documents</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {docInputs.map((inp, key) => inp)}
            <select
              className="form-select form-select-lg mb-3"
              onChange={(e) => setDistCount(e.target.value)}
            >
              <option selected>Select the number of distributors</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            {distInputs.map((inp, key) => inp)}
            <Form.Label>Is tree tree available?</Form.Label>
            <Form.Select
              className="mb-3"
              onChange={(e) => setTreeAvailable(e.target.value)}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>
            Close
          </button>
          <button onClick={handleAdd}>
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddBtn;
