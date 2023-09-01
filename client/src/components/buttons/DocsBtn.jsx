import React, { useState, useEffect } from "react";
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
      <button  onClick={handleShow}>
        View Docs
      </button>
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
          <button onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DocsBtn;
