import { useEffect, useState } from "react";
import "./TableSelection.css";
import "reactjs-popup/dist/index.css";

export const TableSelection = () => {
  // Sample data until there is an API
  const tables = ["Electronics INC", "Side hobby project", "School robotics"];

  return (
    <div id="tables">
      <div>
        <h2>Choose your desired table</h2>
        <ul>
          {tables.map((table) => (
            <li>
              <button>{table}</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="new-table-div">
        <form>
          <h2>Create a new table</h2>
          <input type="text"></input>
          <button>Create</button>
        </form>
      </div>
    </div>
  );
};
