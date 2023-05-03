import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div id="side">
      <a href="/">Home</a>
      <a href="/queries">Queries</a>
      <a href="/logs">Logs</a>
      <a href="/reports">Reports</a>
      <a href="/users">Users</a>
      <a href="/logout">Logout</a>
    </div>
  );
};

export default Sidebar;
