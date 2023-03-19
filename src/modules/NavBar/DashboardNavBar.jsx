import React from "react";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import "./DashboardNavBar.scss";
import Logo from "../../assets/logo.jpg";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const DashBoardNavBar = () => {
  const { loggedInUserInfo } = useLoggedInUser();
  const naviagte = useNavigate();

  const logOut = () => {
    localStorage.removeItem("loggedInUser");
    naviagte("/login");
  };
  return (
    <header className="dashboard__navbar">
      <div className="dashboard__navbar__logo">
        <img src={Logo} alt="Planning Poker Logo" />
        Planning Poker
      </div>
      <div className="dashboard__navbar__user">
        <div className="dashboard__navbar__user__logo">
          {loggedInUserInfo.fullName.charAt(0)}
        </div>
        {loggedInUserInfo.fullName}
        <TbLogout
          className="dashboard__navbar__logout__button"
          onClick={logOut}
        />
      </div>
    </header>
  );
};

export default DashBoardNavBar;
