import React, { useState, useEffect } from "react";
import axios from "../Axios/axios";

function StoryPoints({ isModerator, story, sessionId }) {
  const [points, setPoints] = useState(null);

  const getStoryPoints = async () => {
    axios
      .get(`userstorypoint.php?storyId=${story?.id}`)
      .then((response) => {
        setPoints(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function calculateAverage() {
    const sum = points.reduce((acc, curr) => acc + parseInt(curr.points), 0);
    const avg = sum / points.length;
    return Math.floor(avg);
  }
  console.log(points);

  const acceptResult = async () => {
    try {
      axios
        .post("userstories.php", {
          avg: calculateAverage(),
          storyId: story?.id,
          sessionId: sessionId,
          action: "updateResult",
        })
        .then((response) => console.log(response.data.message));
    } catch (error) {
      console.error(error);
    }
  };

  const rejectResult = async () => {
    try {
      axios
        .delete(`userstorypoint.php?storyId=${story?.id}`)
        .then((response) => console.log(response.data));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div>
        {isModerator && <button onClick={getStoryPoints}>Reveal Points</button>}
      </div>
      {points && (
        <div>
          <h2>Story Points</h2>
          <ul>
            {points?.map((point) => (
              <li key={point.fullName}>{point.points}</li>
            ))}
          </ul>
          <p>
            Average:
            {calculateAverage()}
          </p>
          <button onClick={acceptResult}>Accept</button>
          <button onClick={rejectResult}>Reject</button>
        </div>
      )}
    </div>
  );
}

export default StoryPoints;
