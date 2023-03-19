import React, { useState } from "react";

export default function useIsModerator() {
  const moderator = JSON.parse(localStorage.getItem("isModerator")) || {};
  const [isModerator, setIsModerator] = useState(moderator);

  return { isModerator };
}
