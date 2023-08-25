import React from "react";
import Navbar from "../components/Navbar";
import Button from "react-bootstrap/Button";
import instance from "./axios-instance";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";

const Reports = () => {
  const [pid, setPid] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  
  const handleClose = () => {
    setPid("");
    setShow(false);
  };

  const handleClick = async () => {
    try {
      const report = await instance.get("/getReportOne", {
        responseType: "blob",
      });

      console.log(report);

      const blob = new Blob([report.data], {
        type: "application/octet-stream",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "generated_report.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.log("Error generating the report: ", err);
    }
  };

  const handleClick2 = async () => {
    const pidObj = {pid:pid}

    try {
      const report = await instance.post("/getReportTwo", pidObj, {
        responseType: "blob",
      });

      console.log(report);

      const blob = new Blob([report.data], {
        type: "application/octet-stream",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "hierarchical_report.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.log("Error generating the report: ", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        {/* vh-100 ensures the container takes up the full viewport height */}
        <Button onClick={handleClick} className="btn btn-primary mb-3">
          Generate Report
        </Button>
        <Button variant="primary" onClick={handleShow}  className="btn btn-warning mb-3">
        Generate hierarchical report
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generate hierarchical report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <InputGroup className="mb-3">
              <Form.Control
                onChange={(e) => {
                  setPid(e.target.value);
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
          <Button variant="primary" onClick={handleClick2}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Reports;
