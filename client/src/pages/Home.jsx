import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Table from "../components/Table";
import Sidebar from "../components/Sidebar";
import AddBtn from "../components/buttons/AddBtn";
import RemoveBtn from "../components/buttons/RemoveBtn";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export const Home = () => {
  const [searchQuery, setSetQuery] = useState("");
  const [item, setItem] = useState({});
  const [data, setData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const query = {
      pid: searchQuery,
    };

    const URL = "http://localhost:5000/api/searchItem";

    const response = await axios.post(URL, query);
    const data = response.data;
    setItem(data);
  };

  const fetchData = async () => {
    const URL = "http://localhost:5000/api/";

    const response = await axios.get(URL);
    const data = response.data;
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-fluid p-0">
      <Header />
      <Sidebar />
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-around m-2">
          <InputGroup className="mb-3 w-25">
            <Form.Control
              onChange={(e) => {
                setSetQuery(e.target.value);
              }}
              placeholder="Item"
            />
            <button id="basic-addon1">&#x1F50E;&#xFE0E;</button>
          </InputGroup>
          <AddBtn />
          <RemoveBtn />
        </div>
      </form>
      <Table data={item} />
    </div>
  );
};
