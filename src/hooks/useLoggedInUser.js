import React, { useState } from "react";

export default function useLoggedInUser() {
  const localUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
  const [loggedInUserInfo, setLoggedInUserInfo] = useState(localUser);

  return { loggedInUserInfo };
}
