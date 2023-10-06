import Navbar from "../components/Navbar";
import instance from "./axios-instance";
import { useState } from "react";

const Profile = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");

  const handleSubmit = async () => {
    try {
      if (newPassword !== newPasswordRepeat) {
        alert("New passwords do not match!");
        return;
      }

      const userInfo = { oldPassword: oldPassword, newPassword: newPassword };
      const URL = "/change-password";

      const response = instance.post(URL, userInfo);
      if (response.status === 200) {
        alert("Password changes succesfullly");
      }
    } catch (e) {
      alert("An error has occured");
    }
  };

  return (
    <>
      <Navbar />
      <div className="d-flex flex-column align-items-center w-50">
        <div className="form-group">
          <label htmlFor="oldPassword">Old password</label>
          <input
            type="password"
            className="login-input"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">New password</label>
          <input
            type="password"
            className="login-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm new password</label>
          <input
            type="password"
            className="login-input"
            value={newPasswordRepeat}
            onChange={(e) => setNewPasswordRepeat(e.target.value)}
            required
          />
        </div>
        <button className="login-button" onSubmit={handleSubmit}>
          Change password
        </button>
      </div>
    </>
  );
};

export default Profile;
