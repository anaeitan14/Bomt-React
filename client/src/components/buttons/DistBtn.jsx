import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DistBtn = ({ data }) => {
  // let dists;

  // useEffect(() => {
  //   {
  //     dists = data.map((dist) => {
  //       return (
  //         <div>
  //           <p>{dist.DistrobutorID}</p>
  //           <p>{dist.DistrobutorName}</p>
  //         </div>
  //       );
  //     });
  //   }
  // }, []);
  // console.log(data);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View Dists
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Distributioners</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>{dists}</Modal.Body> */}
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
