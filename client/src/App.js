import { Navigate } from "react-router-dom";
import { Home } from "./pages/Home";

function App() {
  const isAuth = localStorage.getItem("Authenticated") !== null;

  return <>{isAuth ? <Home /> : <Navigate to="/login" />}</>;
}

export default App;
