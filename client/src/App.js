import { Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import { TableSelection } from "./components/TableSelection";
import { MainTable } from "./components/MainTable";

function App() {

  const isAuth = true;

  return (
    <>
    {isAuth ? <MainTable/> : <Navigate to="/login"/>}
    </>
  );
}

export default App;

