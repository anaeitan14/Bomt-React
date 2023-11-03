import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import instance from "./axios-instance";
import "./Logs.css";

const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const response = await instance.get("/getLogs");

      const sortedArray = response.data.sort((b, a) => {
        return new Date(a.timestamp) - new Date(b.timestamp);
      });

      const formattedAndSortedArray = sortedArray.map((item) => {
        const formattedDate = new Date(item.timestamp).toLocaleString("en-GB");
        return {
          ...item,
          timestamp: formattedDate,
        };
      });

      setLogs(formattedAndSortedArray);
    } catch (error) {
      console.error("Error loading logs:", error);
    }
  };

  return (
    <>
      <Navbar />
      <ul className="logs-list">
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <li key={index} className="log-item">
              <span className="log-text">{log.action} at </span>
              <span className="timestamp">{log.timestamp}</span>
            </li>
          ))
        ) : (
          <div className="empty-logs">No logs available.</div>
        )}
      </ul>
    </>
  );
};

export default Logs;
