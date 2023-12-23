import { useState, useEffect } from "react";
import instance from "./axios-instance";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import AddBtn from "../components/buttons/AddBtn";
import RemoveBtn from "../components/buttons/RemoveBtn";
import ChildBtn from "../components/buttons/ChildBtn";
import "./Home.css"; // Import the Home component-specific styles

export const Home = () => {
  useEffect(() => {
    setEmail(localStorage.getItem("email"));

    setTimeout(() => {
      if (errorMessage) {
        setErrorMessage("");
      }
    }, 2500);
  });

  const [searchQuery, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [sons, setSons] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const query = {
      email: email,
      pid: searchQuery,
    };

    let URL = "/searchItem";
    let response;

    try {
      response = await instance.post(URL, query);
      setData(response.data);
      setSons(response.data.Sons);

      if (response.data) {
        const queries = localStorage.getItem("Queries");
        localStorage.setItem("Queries", queries.concat(`,${query.pid}`));
      }

      if (sons.length > 0) {
        for (let i = 0; i < sons.length; i++) {
          try {
            query.pid = sons[i];
            URL = "/searchChild";
            let childResponse = await instance.post(URL, query);
            if (childResponse) {
              setData(...data, childResponse.data);
            }
          } catch (e) {
            console.log(e);
          }
        }
      }
    } catch (err) {
      if (err.response.status === 400) {
        setData([]);
        setErrorMessage(err.response.data.message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="mx-auto">
          <form onSubmit={handleSubmit}>
            <div class="input-group mb-3">
              s
              <input
                type="search"
                className="form-control"
                placeholder="Product name"
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </form>
          <AddBtn />
          <RemoveBtn />
          <ChildBtn data={searchQuery} />
          {data.ProductID ? (
            <Table data={data} />
          ) : (
            <div style={{ color: "red" }}>{errorMessage}</div>
          )}
        </div>
      </div>
    </>
  );
};
