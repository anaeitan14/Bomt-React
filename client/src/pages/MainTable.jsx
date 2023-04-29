import Header from "../components/Header";
import Footer from "../components/Footer";
import Table from "../components/Table";
import Sidebar from "../components/Siderbar";
import AddItem from "../components/AddItem";
import "./MainTable.css";

export const MainTable = () => {
  return (
    <>
      <Header />
      <label htmlFor="search">Search:</label>
      <input type="text" id="search" />
      <AddItem buttonName="Add item" buttonTitle="Add item" buttonAction="Add" />
      <AddItem buttonName="Remove item" buttonTitle="Remove item" buttonAction="Remove" />
      <Sidebar />
      <Table />
      <Footer />
    </>
  );
};
