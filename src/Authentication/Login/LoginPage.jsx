import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FormInput from "../FormInput";
import "./LoginPage.scss";
import useFetchUsers from "../../hooks/useFetchUsers";
import Login from "../../assets/5469.jpg";

const LoginPage = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    action: "login",
  });
  const { loginStatus, validateUser } = useFetchUsers();

  const handleInputChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!loginDetails.email || !loginDetails.password) {
      alert("Empty field");
    } else {
      validateUser(loginDetails);
    }
  };
  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__title">Login Page</h1>
        <form onSubmit={handleFormSubmit} className="login__form">
          <FormInput
            label="Email"
            name="email"
            type="email"
            handleInputChange={handleInputChange}
            value={loginDetails.email}
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            handleInputChange={handleInputChange}
            value={loginDetails.password}
          />
          <input type="submit" value="Login" className="login__button" />
        </form>
        <p className="login__additional">
          Don't have an account?{" "}
          <Link to="/signup" className="login__additional__link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
