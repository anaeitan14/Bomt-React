import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("Authenticated");
    localStorage.removeItem("UID");
    navigate("/login");
  };

  return (
    <div id="side">
      <a href="/">Home</a>
      <a href="/queries">Queries</a>
      <a href="/logs">Logs</a>
      <a href="/reports">Reports</a>
      <a href="/users">Users</a>
      <button id="logout" onClick={handleSignout}>Logout</button>
    </div>
  );
};

export default Sidebar;
