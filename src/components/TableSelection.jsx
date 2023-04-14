import {useEffect, useState} from "react";
import "./TableSelection.css";



export const TableSelection = () => {

    useEffect(()=> {
        document.body.className="table-select";
    },[])

    const tables = ["Electronics INC", "Side hobby project", "School robotics"];

    return (
        <div id="tables">
            <h2 style={{textAlign:"center"}}>Choose your desired table</h2>
            <ul>
                {tables.map((table)=>(
                    <li><button>{table}</button></li>
                ))}
            </ul>
            <form>
                <label>Create a new table
                <input type="text" placeholder="Table name"></input>
                </label>
                <button>
                    Create
                </button>
            </form>
        </div>
    )
}