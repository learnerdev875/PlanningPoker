import React from "react";
import "./Button.scss";

const Button = ({ icon, label }) => {
  return (
    <button className="social-link-icon">
      {icon}
      {label}
    </button>
  );
};

export default Button;
