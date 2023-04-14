import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import { TableSelection } from "./components/TableSelection";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="forgot" element={<ForgotPassword/>}/>
        <Route path="tableSelect" element={<TableSelection/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;