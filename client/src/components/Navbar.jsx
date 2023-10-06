import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import instance from "../pages/axios-instance";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "../components/buttons/Button.css";

function CustomNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const URL = "/logout";
    const data = {
      email: localStorage.getItem("email"),
    };

    localStorage.clear();

    const response = await instance.post(URL, data);
    if (response.status === 200) {
      navigate("/login");
    }
  };
  const [pid, setPid] = useState("");
  const [show, setShow] = useState(false);
  const [depth, setDepth] = useState(0);
  const handleShow2 = () => setShow(true);

  const handleCloseUser = () => {
    setPid("");
    setShow(false);
  };

  const handleClick = async () => {
    try {
      const report = await instance.get("/getReportOne", {
        responseType: "blob",
      });

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
    const pidObj = { pid: pid, depth: depth };

    try {
      const report = await instance.post("/getReportTwo", pidObj, {
        responseType: "blob",
      });

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

  const [user, setUser] = useState("");
  const [manager, setManager] = useState("");
  const [showUser, setShowUser] = useState(false);
  const [showManager, setShowManager] = useState(false);

  const handleShow = () => {};

  const handleClose = () => {
    setUser("");
    setManager("");
  };

  const handleAddUser = async () => {
    const URL = "/addUser";

    try {
      const response = await instance.post(URL, user);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    handleClose();
  };

  const handleAddManager = async () => {
    const URL = "/addManager";

    try {
      const response = await instance.post(URL);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    handleClose();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/profile">
        Signed in as {localStorage.getItem("email")}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/queries">Queries</Nav.Link>
          <Nav.Link href="/logs">Logs</Nav.Link>
          <NavDropdown title="Reports" id="basic-nav-dropdown">
            <NavDropdown.Item>
              {" "}
              <a onClick={handleClick}>Generate Basic Report</a>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <a onClick={handleShow}>Generate Hierarchical Report</a>
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
                      <Form.Control
                        onChange={(e) => {
                          setDepth(e.target.value);
                        }}
                        placeholder="Depth level"
                        type="number"
                      />
                    </InputGroup>
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <button className="custom-button" onClick={handleClose}>
                    Close
                  </button>
                  <button className="custom-button" onClick={handleClick2}>
                    Add
                  </button>
                </Modal.Footer>
              </Modal>
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Users" id="basic-nav-dropdown">
            <NavDropdown.Item>
              <a onClick={showUser}>Add user</a>
              <Modal show={showUser} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group>
                    <InputGroup className="mb-3">
                      <Form.Control
                        onChange={(e) => {
                          setUser(e.target.value);
                        }}
                        placeholder="User email"
                      />
                    </InputGroup>
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <button onClick={handleClose}>Close</button>
                  <button onClick={handleAddUser}>Add</button>
                </Modal.Footer>
              </Modal>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <a onClick={showManager}>Add manager</a>
              <Modal show={showManager} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add manager</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group>
                    <InputGroup className="mb-3">
                      <Form.Control
                        onChange={(e) => {
                          setManager(e.target.value);
                        }}
                        placeholder="Manager email"
                      />
                    </InputGroup>
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <button className="custom-button" onClick={handleClose}>
                    Close
                  </button>
                  <button className="custom-button" onClick={handleAddManager}>
                    Add
                  </button>
                </Modal.Footer>
              </Modal>
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link>
            <button
              style={{
                background: "none",
                color: "rgba(255, 255, 255, 0.55)",
                border: "none",
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
