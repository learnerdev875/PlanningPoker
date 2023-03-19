import React from "react";

const NewStory = () => {
  return (
    <div>
      <h1>New Story Form</h1>
      <form>
        <input type="text" placeholder="New Story" />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

export default NewStory;
