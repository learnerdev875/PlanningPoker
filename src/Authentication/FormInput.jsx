import React from "react";
import "./FormInput.scss";

const FormInput = ({ type, handleInputChange, value, name, label, id }) => {
  return (
    <div className="form__input" id={id}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default FormInput;
