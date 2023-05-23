import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DocsBtn = ({ data }) => {
  const [show, setShow] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [doc, setDoc] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (data !== undefined) {
      setDoc(data);
      setShowDocs(true);
    }
  });

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View Docs
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Documents</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showDocs &&
            doc.map((document, idx) => {
              return (
                <p key={idx}>
                  Document Type = {document.DocumentType}, Document Location ={" "}
                  {document.DocumentLocation}
                </p>
              );
            })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DocsBtn;
