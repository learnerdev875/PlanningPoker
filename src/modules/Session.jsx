import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../Axios/axios";
import ErrorPage from "./ErrorPage";
import IndividualSession from "./IndividualSession";

const Session = () => {
  let { sessionId } = useParams();
  const [isValidSession, setIsValidSession] = useState();

  const validateSession = async () => {
    try {
      axios
        .get(`session.php?action=validateSession&sessionId=${sessionId}`)
        .then((response) => {
          setIsValidSession(response.data.isValid);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    validateSession();
  }, []);
  if (!isValidSession) {
    return <ErrorPage />;
  }
  if (isValidSession) {
    return <IndividualSession sessionId={sessionId} />;
  }
};

export default Session;
