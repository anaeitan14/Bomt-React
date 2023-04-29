import Header from "../components/Header";
import Footer from "../components/Footer";
import Table from "../components/Table";
import Sidebar from "../components/Siderbar";
import "./MainTable.css";

export const MainTable = () => {
    return (
        <div>
            <Header/>
            <input type="text" placeholder="Search" />
            <Sidebar/>
            <Table/>
            <Footer/>
        </div>
    )
}