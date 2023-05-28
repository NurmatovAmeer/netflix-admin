import React, { useState, useContext } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { logout } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout(dispatch);
    window.reload();
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">lamaadmin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div className="avatarDropdown">
            <img
              onClick={handleOpen}
              src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="topAvatar"
            />
            {open ? (
              <div className="dropdown">
                <button className="dropdownButton" onClick={handleLogout}>
                  Log out
                </button>
                <button className="dropdownButton">my account</button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
