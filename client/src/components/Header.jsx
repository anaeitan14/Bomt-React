import "./Header.css";
import { useState, useEffect } from "react";

const Header = () => {
  const [usernameOnline, setUsernameOnline] = useState("");

  useEffect(() => {
    setUsernameOnline(localStorage.getItem("UID"));
  }, []);

  return (
    <div id="header">
      <h2>
        <a href="/profile">
          <span>{usernameOnline}</span>
        </a>{" "}
        online
      </h2>
    </div>
  );
};

export default Header;
