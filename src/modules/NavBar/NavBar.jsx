import React, { useState } from "react";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import "./NavBar.scss";
import { FiUserPlus } from "react-icons/fi";
import { AiOutlineFileAdd } from "react-icons/ai";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const NavBar = ({
  setShowAddStory,
  showAddStory,
  showStories,
  setShowStories,
  isModerator,
}) => {
  const { loggedInUserInfo } = useLoggedInUser();
  const naviagte = useNavigate();

  const logOut = () => {
    localStorage.removeItem("loggedInUser");
    naviagte("/login");
  };
  return (
    <header className="navbar">
      <div className="navbar__user">
        <div className="navbar__user__logo">
          {loggedInUserInfo.fullName.charAt(0)}
        </div>
        {loggedInUserInfo.fullName}
      </div>
      <div className="navbar__actions">
        <button>
          <FiUserPlus />
          Invite members
        </button>
        {isModerator ? (
          <button onClick={() => setShowAddStory(!showAddStory)}>
            <AiOutlineFileAdd />
            Add New Story
          </button>
        ) : (
          <button onClick={() => setShowStories(!showStories)}>
            Show Stories
          </button>
        )}
        <TbLogout className="navbar__actions__logout" onClick={logOut} />
      </div>
    </header>
  );
};

export default NavBar;
