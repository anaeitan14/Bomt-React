import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Navbar";
import Table from "../components/Table";
import AddBtn from "../components/buttons/AddBtn";
import RemoveBtn from "../components/buttons/RemoveBtn";

export const Home = () => {
  const [searchQuery, setQuery] = useState("");
  const [item, setItem] = useState({});
  const [data, setData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const query = {
      pid: searchQuery,
    };

    const URL = "http://localhost:5000/api/searchItem";
    let response;

    try {
      response = await axios.post(URL, query);
      setData(response.data);
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        alert(err.response.data.message);
      }
    }
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
    <>
      <Header />
      <div className="container-fluid p-3">
        <form className="d-flex justify-content-around" onSubmit={handleSubmit}>
          <div className="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Item"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </div>
          <AddBtn />
          <RemoveBtn />
        </form>
      </div>
      <Table data={data} />
    </>
  );
};
