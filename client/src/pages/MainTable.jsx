import Header from "../components/Header";
import Table from "../components/Table";
import Sidebar from "../components/Siderbar";
import ModalButton from "../components/ModalButton";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "./MainTable.css";

export const MainTable = () => {
  return (
    <>
      <Header />
      <div id="search-add-remove">
        <InputGroup className="mb-3 w-25">
          <InputGroup.Text id="basic-addon1">&#x1F50E;&#xFE0E;</InputGroup.Text>
          <Form.Control
          onChange={()=>{alert("ok")}}
            placeholder="Item"
            aria-label="Item"
            aria-describedby="Item"
          />
        </InputGroup>
        <ModalButton buttonName="Add item" buttonTitle="Add item" buttonAction="Add" />
        <ModalButton buttonName="Remove item" buttonTitle="Remove item" buttonAction="Remove" />
      </div>
      <Sidebar />
      <Table />
    </>
  );
};
