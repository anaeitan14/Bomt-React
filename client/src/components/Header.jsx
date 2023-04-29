import "./Header.css";
import { useState, useEffect } from "react";

const Header = () => {
  const [usernameOnline, setUsernameOnline] = useState("");

  useEffect(()=> {
    setUsernameOnline("Eitan");
  });

  return (
    <div id="header">
      <h2><span>{usernameOnline}</span> online</h2>
    </div>
  );
};

export default Header;
