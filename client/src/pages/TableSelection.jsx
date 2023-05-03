import { useEffect, useState } from "react";
import "reactjs-popup/dist/index.css";

export const TableSelection = () => {
  // Sample data until there is an API
  const tables = ["Electronics INC", "Side hobby project", "School robotics"];

  return (
    <div className="container-fluid">
      <h2>Choose your desired table</h2>
      <ul className="list-group">
        {tables.map((table) => (
          <li>
            <button className="list-group-item  list-group-item-action">
              {table}
            </button>
          </li>
        ))}
      </ul>
      <form>
        <h2>Create a new table</h2>
        <input type="text" className="form-control"></input>
        <button className="btn btn-primary">Create</button>
      </form>
    </div>
  );
};
