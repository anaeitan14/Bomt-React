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
  });

  const [searchQuery, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [sons, setSons] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const query = {
      email: email,
      pid: searchQuery,
    };

    const URL = "/searchItem";
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
            console.log(query);
            let childResponse = await instance.post(URL, query);
            console.log(childResponse);
            if (childResponse) {
              setData(data.concat(childResponse.data));
            }
          } catch (e) {
            console.log("no childs");
          }
        }
      }
    } catch (err) {
      if (err.response.status === 400) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="container-fluid p-3 d-flex justify-content-around">
        <form className="home-form" onSubmit={handleSubmit}>
          <input
            className="home-input"
            type="search"
            placeholder="Item"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        <AddBtn />
        <RemoveBtn />
        <ChildBtn data={searchQuery} />
      </div>
      <Table data={data} />
    </div>
  );
};
