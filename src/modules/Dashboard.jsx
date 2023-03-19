import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../Axios/axios";
import useLoggedInUser from "../hooks/useLoggedInUser";
import DashBoardNavBar from "./NavBar/DashboardNavBar";
import "./Dashboard.scss";

const Dashboard = () => {
  const navigate = useNavigate();
  const { loggedInUserInfo } = useLoggedInUser();
  const [sessions, setSession] = useState();

  const getPastSessions = async () => {
    try {
      const response = await axios.get(
        `history.php?userId=${loggedInUserInfo.id}`
      );
      setSession(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPastSessions();
  }, []);
  const handleClick = () => {
    navigate("/new-game");
  };
  return (
    <>
      <DashBoardNavBar />
      <div className="dashboard">
        <table>
          <thead>
            <tr>
              <th>Session Name</th>
              <th>Status</th>
              <th>CreatedAt</th>
            </tr>
          </thead>
          <tbody>
            {sessions?.map((session) => {
              return (
                <tr key={session.id}>
                  <td>{session.name}</td>
                  <td>{session.status}</td>
                  <td>{session.createdAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={handleClick} className="dashboard__button">
          Start new game
        </button>
      </div>
    </>
  );
};

export default Dashboard;
