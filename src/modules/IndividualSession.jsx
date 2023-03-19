import React, { useEffect, useState } from "react";
import axios from "../Axios/axios";
import useLoggedInUser from "../hooks/useLoggedInUser";
import NavBar from "./NavBar/NavBar";
import UserStory from "./UserStory";
import IndividualStoryDashboard from "./IndividualStoryDashboard";

const IndividualSession = ({ sessionId }) => {
  const { loggedInUserInfo } = useLoggedInUser();
  const [next, setNext] = useState(null);
  const [next2, setNext2] = useState(null);
  const [members, setMembers] = useState();
  const [isModerator, setIsModerator] = useState(false);
  const [showAddStory, setShowAddStory] = useState(false);
  const [showAddStoryForm, setShowAddStoryForm] = useState(false);
  const [storyName, setStoryName] = useState("");
  const [userStories, setUserStories] = useState();
  const [showStories, setShowStories] = useState(false);
  const [vote, setVote] = useState(0);

  //function to end current session
  const endSession = async () => {
    try {
      const response = await axios.put(`session.php?sessionId=${sessionId}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //function to list all the participants of a session
  const getMembers = async () => {
    try {
      axios
        .get(`members.php?sessionId=${sessionId}`)
        .then((response) => setMembers(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  //function that gets called when a new user is invited to a session through url
  const addParticipant = async () => {
    try {
      const response = await axios.post(`session.php?sessionId=${sessionId}`, {
        ...loggedInUserInfo,
        action: "addParticipant",
      });
      if (response.data.success) {
        setNext(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //function that checks whether the loggedIn user is moderator or member of current session
  const checkModerator = async () => {
    try {
      const response = await axios.get(
        `session.php?action=checkModerator&sessionId=${sessionId}&userId=${loggedInUserInfo.id}`
      );
      setIsModerator(response.data.isModerator);
    } catch (error) {
      console.error(error);
    }
  };

  //function that adds new user story to the current session
  const addNewStory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("userstories.php", {
        storyName: storyName,
        action: "addNewStory",
        sessionId: sessionId,
      });
      setShowAddStoryForm(false);
      setNext2(true);
      setStoryName("");
    } catch (error) {
      console.error(error);
    }
  };

  //function to get all user stories in a session
  const getAllUserStories = async () => {
    try {
      const response = await axios.get(
        `userstories.php?sessionId=${sessionId}`
      );
      setUserStories(response.data);
      setNext2(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    addParticipant();
  }, []);

  useEffect(() => {
    checkModerator();
    getMembers();
  }, [next]);

  useEffect(() => {
    getAllUserStories();
  }, [next2]);
  return (
    <>
      <NavBar
        setShowAddStory={setShowAddStory}
        showAddStory={showAddStory}
        setShowStories={setShowStories}
        showStories={showStories}
        isModerator={isModerator}
      />
      <div className="session">
        <h1 className="session__title">Session {sessionId}</h1>
        <h2 className="session__participants">Participants</h2>
        <ul>
          {members?.map((member) => (
            <li key={member.id}>{member.fullName}</li>
          ))}
        </ul>
        <div>
          <button onClick={endSession}>End Session</button>
        </div>
        {showAddStory && (
          <div>
            <h1>All User Stories</h1>
            <div>
              {userStories?.map((userStory, index) => (
                <UserStory
                  id={userStory.id}
                  name={userStory.name}
                  status={userStory.status}
                  index={index}
                  isModerator={isModerator}
                />
              ))}
            </div>
            {showAddStoryForm ? (
              <form onSubmit={addNewStory}>
                <input
                  type="text"
                  placeholder="New Story"
                  name="storyName"
                  value={storyName}
                  onChange={(e) => setStoryName(e.target.value)}
                />
                <button onClick={() => setShowAddStoryForm(false)}>
                  Cancel
                </button>
                <input type="submit" value="Add" />
              </form>
            ) : (
              <button onClick={() => setShowAddStoryForm(true)}>Add new</button>
            )}
          </div>
        )}
        {showStories && (
          <div>
            <h1>All user Stories</h1>
            <div>
              {userStories?.map((userStory, index) => (
                <UserStory
                  id={userStory.id}
                  name={userStory.name}
                  status={userStory.status}
                  index={index}
                  sessionId={sessionId}
                  isModerator={isModerator}
                />
              ))}
            </div>
          </div>
        )}
        <IndividualStoryDashboard
          setVote={setVote}
          sessionId={sessionId}
          vote={vote}
          userId={loggedInUserInfo.id}
          isModerator={isModerator}
        />
      </div>
    </>
  );
};

export default IndividualSession;
