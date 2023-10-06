import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "./Button.css";

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
  });

  return (
    <>
      <button className="custom-button" onClick={handleShow}>
        View Dists
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Distributioners</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {display &&
            dist.map((dist, idx) => {
              return (
                <p key={idx}>
                  {" "}
                  Distributor ID = {dist.DistrobutorID}, Distributor Name ={" "}
                  {dist.DistrobutorName}
                </p>
              );
            })}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DistBtn;
