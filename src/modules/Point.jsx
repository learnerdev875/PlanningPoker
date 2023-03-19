import React from "react";
import "./Point.scss";

const Point = ({ number, setVote }) => {
  return (
    <div className="userStory__point" onClick={(e) => setVote(number)}>
      {number}
    </div>
  );
};

export default Point;
