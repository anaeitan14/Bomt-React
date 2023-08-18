import { useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import { useEffect } from "react";
import instance from "./pages/axios-instance";


function App() {
  const navigate = useNavigate();

  const getAuthentication = async () => {
    const response = await instance.get("/getLogs");
    console.log(response.request.status);
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
