import React from "react";
import axios from "../Axios/axios";

const UserStory = ({ name, id, status, index, isModerator }) => {
  //function to select next story
  const nextStory = async () => {
    try {
      const response = await axios.post("userstories.php", {
        action: "updateStory",
        storyId: { id },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(isModerator);
  return (
    <div>
      <p>US-{index + 1}</p>
      <p>{id}</p>
      <p>{name}</p>
      <p>{status == "active" ? "Voting Now" : "Voting Next"}</p>
      {isModerator && (
        <button onClick={nextStory}>
          {status == "active" ? "In Progress" : "Vote this"}
        </button>
      )}
    </div>
  );
};

export default UserStory;
