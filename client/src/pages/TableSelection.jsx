import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import instance from "./axios-instance";

export const TableSelection = () => {
  const [data, setData] = useState([]);
  const [newTableName, setNewTableName] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTables();
  }, [data.length]);

  const fetchTables = async () => {
    try {
      const response = await instance.get("/getTables");
      setData(response.data.tableNames);
    } catch (error) {
      console.error("Error fetching tables data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: newTableName,
    };

    const response = await instance.post("/addTable", data);
    if (response.status === 200) {
      fetchTables();
    }
  };

  const handleClick = async (table) => {
    setSelectedTable(table);
  };

  const handlePick = async (e) => {
    e.preventDefault();
    const data = { tableName: selectedTable };
    const response = await instance.post("/pickTable", data);
    if (response.status === 200) {
      navigate("/");
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-dark text-white overflow-hidden">
      <div className="container-fluid">
        <h2>Choose your desired table</h2>
        <ul className="list-group list-unstyled">
          {data.map((table) => {
            return (
              <li className="m-1">
                <form onSubmit={handlePick}>
                  <button
                    onClick={() => handleClick(table)}
                    className="list-group-item list-group-item-action w-50 rounded"
                  >
                    {table}
                  </button>
                </form>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="d-flex justify-content-center container-fluid">
        <form onSubmit={handleSubmit}>
          <h2>Create a new table</h2>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setNewTableName(e.target.value)}
          />
          <button className="btn btn-primary mt-2">Create</button>
        </form>
      </div>
    </div>
  );
};
