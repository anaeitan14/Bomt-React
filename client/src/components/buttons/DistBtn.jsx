import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DistBtn = ({ data }) => {
  const [show, setShow] = useState(false);
  const [dist, setDist] = useState([]);
  const [display, setDisplay] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (data !== undefined) {
      setDist(data);
      setDisplay(true);
    }
  }, []);

  console.log(dist);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View Dists
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Distributioners</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {display &&
            dist.map((dist) => {
              return (
                <>
                  <p>{dist.DistrobutorID}</p>
                  <p>{dist.DistrobutorName}</p>
                </>
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

export default DistBtn;
