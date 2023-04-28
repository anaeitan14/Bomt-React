import { Navigate } from "react-router-dom";
import { MainTable } from "./pages/MainTable";

function App() {

  const isAuth = true;

  return (
    <>
    {isAuth ? <MainTable/> : <Navigate to="/login"/>}
    </>
  );
}

export default App;

