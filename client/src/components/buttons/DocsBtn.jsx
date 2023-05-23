import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DocsBtn = ({ data }) => {
  // useEffect(() => {
  //   {
  //     data.map((doc) => (
  //       <div>
  //         <p>{doc.DocumentType}</p>
  //         <p>{doc.DocumentLocation}</p>
  //       </div>
  //     ));
  //   }
  // }, [data]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View Docs
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Documents</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
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
