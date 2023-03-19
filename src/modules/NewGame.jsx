import React, { useState } from "react";
import FormInput from "../Authentication/FormInput";
import axios from "../Axios/axios";
import { useNavigate } from "react-router-dom";

const NewGame = () => {
  const [session, setSession] = useState({
    session_name: "",
    session_description: "",
  });
  const localUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
  const [user, setUser] = useState(localUser);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSession({
      ...session,
      [e.target.name]: e.target.value,
    });
  };

  const createNewSession = async (e) => {
    e.preventDefault();
    if (!session.session_name || !session.session_description) {
      alert("Empty Fields");
    } else {
      try {
        axios
          .post("session.php", {
            ...session,
            user_id: user?.id,
            action: "createNewSession",
          })
          .then((response) => {
            if (response.data.success) {
              navigate(`/session/${response.data.session_id}`);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <h1>Choose a name and description</h1>
      <form onSubmit={createNewSession}>
        <FormInput
          type="text"
          label="Game's name"
          name="session_name"
          handleInputChange={handleInputChange}
        />
        <FormInput
          type="text"
          label="Game's description"
          name="session_description"
          handleInputChange={handleInputChange}
        />
        <input type="submit" value="Create game" />
      </form>
    </div>
  );
};

export default NewGame;
