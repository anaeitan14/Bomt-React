import { useEffect, useState } from "react";
import "reactjs-popup/dist/index.css";
import instance from "./axios-instance";

export const TableSelection = () => {
  // Sample data until there is an API
  const [data, setData] = useState([]);
  const [newTableName, setNewTableName] = useState("");

  useEffect(() => {
    // Fetch the tables data using the instance Axios
    const fetchTables = async () => {
      try {
        const response = await instance.get("/getTables");
        setData(response.data); // Set the fetched data to the state
      } catch (error) {
        console.error("Error fetching tables data:", error);
      }

     
    };

    fetchTables(); // Invoke the fetchTables function
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const URL = "http://localhost:5000/api/addTable";
  //   const data = {
  //     email: localStorage.getItem("email"),
  //     NewTableName: newTableName
  //   };


  //   console.log(data);


  //   const response = await axios.post(URL, data,  {withCredentials: true});
  //   if (response.status == 200) {
  //     alert("Table created successfully");
  //   }
  // };

  return (
    <div className="d-flex justify-content-around align-items-center mt-5 bg-dark text-white">
      <div className="container-fluid">
        <h2>Choose your desired table</h2>
        <ul className="list-group">
          {data === undefined ? data.map((table) => (
            <li>
              <button className="list-group-item list-group-item-action w-50">
                {table}
              </button>
            </li>
          )): null}
        </ul>
      </div>
      <div className="container-fluid">
        {/* <form onSubmit={handleSubmit}>
          <h2>Create a new table</h2>
          <input
            type="text"
            className="form-control w-50"
            onChange={(e) => setNewTableName(e.target.value)}
          />
          <button className="btn btn-primary mt-2">Create</button>
        </form> */}
      </div>
    </div>
  );
};
