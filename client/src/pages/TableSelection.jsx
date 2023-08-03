import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import instance from "./axios-instance";

export const TableSelection = () => {
  const [data, setData] = useState([]);
  const [newTableName, setNewTableName] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const navigate = useNavigate();

  console.log(selectedTable);

  useEffect(() => {
    fetchTables();
  }, []);

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
      alert("Table created successfully");
    }
  };

  const handleClick = async (table) => {
    setSelectedTable(table);

    const data = {tableName:selectedTable}
    console.log(table);
    const response = await instance.post("/pickTable", data);
    if (response.status === 200) {
      navigate("/");
    }
  };

  return (
    <div className="d-flex justify-content-around align-items-center mt-5 bg-dark text-white">
      <div className="container-fluid">
        <h2>Choose your desired table</h2>
        <ul className="list-group">
          {data.map((table) => {
            return (
              <li>
                <button
                  onClick={() => handleClick(table)}
                  className="list-group-item list-group-item-action w-50"
                >
                  {table}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="container-fluid">
        <form onSubmit={handleSubmit}>
          <h2>Create a new table</h2>
          <input
            type="text"
            className="form-control w-50"
            onChange={(e) => setNewTableName(e.target.value)}
          />
          <button className="btn btn-primary mt-2">Create</button>
        </form>
      </div>
    </div>
  );
};
