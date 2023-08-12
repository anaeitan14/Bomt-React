import Navbar from "../components/Navbar";
import Button from "react-bootstrap/Button";
import instance from "./axios-instance";

const Reports = () => {
  const handleClick = async () => {
    try {
      const report = await instance.get("/getReportOne", {
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
        <Button onClick={handleClick}>Generate Report</Button>
      </div>
    </>
  );
};

export default Reports;
