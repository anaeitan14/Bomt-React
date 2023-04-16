import { useEffect, useState } from "react";
import "./TableSelection.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export const TableSelection = () => {
  useEffect(() => {
    document.body.className = "table-select";
  }, []);

  // To be Eran's API :)
  const tables = ["Electronics INC", "Side hobby project", "School robotics"];

  return (
    <div id="tables">
      <div>
        <h2 style={{ textAlign: "center" }}>Choose your desired table</h2>
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
          <h2 style={{ textAlign: "center" }}> Create a new table</h2>
          <input type="text" placeholder="Table name"></input>
          <button>Create</button>
        </form>
      </div>
    </div>
  );
};
