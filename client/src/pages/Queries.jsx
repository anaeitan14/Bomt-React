import Navbar from "../components/Navbar";

const Queries = () => {
  const getQueries = () => {
    let data = localStorage.getItem("Queries");
    if (!data) {
      return <div className="empty-logs">No queries available.</div>;
    }
    data = data.replace(",", " ");
    let res = data.split(" ");

    return res.map((query, i) => {
      if (query !== "") {
        return (
          <li key={i} className="log-item">
            {"Query " + i + " = " + query}
          </li>
        );
      }
    });
  };

  return (
    <>
      <Navbar />
      <ul className="logs-list">{getQueries()}</ul>
    </>
  );
};

export default Queries;
