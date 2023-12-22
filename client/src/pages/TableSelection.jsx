import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "./axios-instance";
import "./TableSelection.css";

export const TableSelection = () => {
  const [data, setData] = useState([]);
  const [newTableName, setNewTableName] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTables();
  }, [data.length]);

  console.log(data);

  const fetchTables = async () => {
    try {
      const response = await instance.get("/getTables");
      setData(response.data.tableNames);
    } catch (error) {
      alert("Error fetching tables data:", error);
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
      navigate("/home");
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
      navigate("/home");
    }
  };

  return (
    <div className="table-selection-container">
      {data.length !== 0 ?
      <div>
         <h2 className="table-selection-heading">Choose your desired table</h2>
        <ul className="table-list">
          {data.map((table) => {
            return (
              <li key={table} className="table-item">
                <form onSubmit={handlePick}>
                  <button
                    onClick={() => handleClick(table)}
                    className="table-button"
                  >
                    {table}
                  </button>
                </form>
              </li>
            );
          })}
        </ul>
      </div> : null}
      <div className="create-table-form">
        <form onSubmit={handleSubmit}>
          <h2 className="create-table-heading">Create a new table</h2>
          <input
            type="text"
            className="create-table-input"
            onChange={(e) => setNewTableName(e.target.value)}
          />
          <button className="table-button">Create</button>
        </form>
      </div>
    </div>
  );
};
