import React, { useState } from "react";
import axios from "../Axios/axios";
import { useNavigate } from "react-router-dom";

export default function useFetchUsers() {
  const navigate = useNavigate();

  const validateUser = async (user) => {
    try {
      axios.post("authentication.php", user).then((response) => {
        if (response.data.success === true) {
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify(response.data.data)
          );
          navigate("/");
        } else {
          setLoginStatus(false);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { validateUser };
}
