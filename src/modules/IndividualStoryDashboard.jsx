import React, { useState, useEffect } from "react";
import VotingDashboard from "./VotingDashboard";
import axios from "../Axios/axios";
import StoryPoints from "./StoryPoints";

const IndividualStoryDashboard = ({
  setVote,
  sessionId,
  vote,
  userId,
  isModerator,
}) => {
  const [story, setStory] = useState();
  const [votes, setVotes] = useState([]);
  const [isRevealed, setIsRevealed] = useState(false);

  //function  to retrieve only active or currently voting user Story
  const getActiveStory = async () => {
    try {
      const response = await axios.get(
        `userstories.php?sessionId=${sessionId}&action=getActiveStory`
      );
      setStory(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  //function to get story points
  const getStoryPoints = async () => {
    try {
      const response = await axios.get(
        `userstorypoint.php?storyId=${story?.id}`
      );
      setVotes(response.data);
      setIsRevealed(!isRevealed);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getActiveStory();
  }, []);
  return (
    <div>
      <h2>{story?.name}</h2>
      <StoryPoints
        isModerator={isModerator}
        story={story}
        sessionId={sessionId}
      />
      <VotingDashboard
        setVote={setVote}
        vote={vote}
        userId={userId}
        storyId={story?.id}
      />
    </div>
  );
};

export default IndividualStoryDashboard;
