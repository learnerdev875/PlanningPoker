import React, { useState } from "react";
import Point from "./Point";
import "./VotingDashboard.scss";
import axios from "../Axios/axios";
const VotingDashboard = ({ vote, setVote, userId, storyId }) => {
  const [points, setPoints] = useState([0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]);

  //function to store user story points in database
  const addStoryPoint = async () => {
    try {
      const response = await axios.post("userstorypoint.php", {
        action: "addStoryPoint",
        point: vote,
        userId: userId,
        storyId: storyId,
      });
      // console.log(response.data.success);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Choose your card</h1>
      <h2>{vote}</h2>
      <div className="userStory__points">
        {points.map((point) => (
          <Point number={point} key={point} setVote={setVote} />
        ))}
      </div>
      <button onClick={addStoryPoint}>Submit</button>
    </div>
  );
};

export default VotingDashboard;
