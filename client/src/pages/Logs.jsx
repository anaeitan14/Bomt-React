import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import instance from "./axios-instance";

const Logs = () => {
  const [logs, setLogs] = useState({});

  useEffect(() => {
    loadLogs();
    console.log(logs);
  }, []);

  const loadLogs = async () => {
    const response = await instance.get("/getLogs");
    console.log(response.data);
    setLogs(response.data);
  };

  return (
    <>
      <Navbar />
      <ul>
        <div>
          {logs.length > 0
            ? logs.map((log) => (
                <li>
                  {log.action} at {log.timestamp}
                </li>
              ))
            : null}
        </div>
      </ul>
    </>
  );
};

export default Logs;
