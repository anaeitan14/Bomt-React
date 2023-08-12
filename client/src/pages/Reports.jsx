import { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Navbar from "../components/Navbar";
import Button from "react-bootstrap/Button";
import instance from "./axios-instance";

const Reports = () => {
  let report;
  const [tableName, setTableName] = useState("");

  const handleClick = async () => {
    try {
      report = await instance.post("/getReportOne", tableName, {
        responseType: "blob",
      });

      console.log(report);

      const blob = new Blob([report.data], {
        type: "application/octet-stream",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "generated_report.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.log("Error generating the report: ", err);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Table name</InputGroup.Text>
          <Form.Control
            type="text"
            onChange={(e) => {
              setTableName(e.target.value);
            }}
            placeholder="Password"
            aria-label="Password"
            aria-describedby="Password"
          />
        </InputGroup>
        <Button onClick={handleClick}>Generate Report</Button>
      </div>
    </>
  );
};

export default Reports;
