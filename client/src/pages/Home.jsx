import { useState, useEffect } from "react";
import instance from "./axios-instance";
import Header from "../components/Navbar";
import Table from "../components/Table";
import AddBtn from "../components/buttons/AddBtn";
import RemoveBtn from "../components/buttons/RemoveBtn";
import ChildBtn from "../components/buttons/ChildBtn";

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
    <>
      <Header />
      <div className="container-fluid p-3">
        <form className="d-flex justify-content-around" onSubmit={handleSubmit}>
          <div className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Item"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </div>
          <AddBtn />
          <RemoveBtn />
          <ChildBtn data={searchQuery} />
        </form>
      </div>
      <Table data={data} />
    </>
  );
};
