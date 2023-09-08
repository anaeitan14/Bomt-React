import Navbar from "../components/Navbar";

const Queries = () => {
  const getQueries = () => {

    const data = localStorage.getItem("Queries");

    data.map(() => {

    });
  };

  return (
    <>
      <Navbar />
    </>
  );
};

export default Queries;
