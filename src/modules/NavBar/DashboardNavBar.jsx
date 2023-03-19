import React from "react";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import "./DashboardNavBar.scss";

const DashBoardNavBar = ({
  setShowAddStory,
  showAddStory,
  showStories,
  setShowStories,
  isModerator,
}) => {
  const { loggedInUserInfo } = useLoggedInUser();
  return (
    <header className="navbar">
      <div className="navbar__user">
        <div className="navbar__user__logo">
          {loggedInUserInfo.fullName.charAt(0)}
        </div>
        {loggedInUserInfo.fullName}
      </div>
      <div className="navbar__actions">
        <button>Invite members</button>
        {isModerator ? (
          <button onClick={() => setShowAddStory(!showAddStory)}>
            Add New Story
          </button>
        ) : (
          <button onClick={() => setShowStories(!showStories)}>
            Show Stories
          </button>
        )}
      </div>
    </header>
  );
};

export default DashBoardNavBar;
