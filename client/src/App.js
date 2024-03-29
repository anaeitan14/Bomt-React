import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login";
import instance from "./pages/axios-instance";

function App() {
  const navigate = useNavigate();

  const getAuthentication = async () => {
    const response = await instance.get("/getLogs");
    if (response.request.status === 200) {
      navigate("/home");
    }
  };

  useEffect(() => {
    getAuthentication();
  }, []);

  return (
    <>
      <Login />
    </>
  );
}

export default App;
