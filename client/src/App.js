import { Navigate } from "react-router-dom";
import { Home } from "./pages/Home";

function App() {
  const isAuth = true;
  
  return <>{isAuth ? <Home /> : <Navigate to="/login" />}</>;
}

export default App;
