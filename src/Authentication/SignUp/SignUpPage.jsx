import React, { useState } from "react";
import FormInput from "../FormInput";
import axios from "../../Axios/axios";
import { Link } from "react-router-dom";
import "./SignUpPage.scss";
import Button from "./Button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import SignUp from "../../assets/5469.jpg";
import Logo from "../../assets/logo.jpg";
const SignUpPage = () => {
  const [users, setUsers] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    action: "signup",
  });

  const handleInputChange = (e) => {
    setUsers({
      ...users,
      [e.target.name]: e.target.value,
    });
  };

  const signUpUser = async (e) => {
    e.preventDefault();
    if (users.password !== users.confirmPassword) {
      alert("Your passwords did not match");
    } else {
      try {
        axios.post("authentication.php", users).then((response) =>
          setUsers({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            action: "signup",
          })
        );
      } catch (error) {
        alert(error.message);
      }
    }
  };
  return (
    <div className="signup">
      <div className="signup__left">
        <img
          src={SignUp}
          alt="Form Image"
          className="signup__left__background"
        />
      </div>
      <div className="signup__right">
        <p className="signup__login__additional">
          Already have an account?{" "}
          <Link to="/login" className="signup__login__link">
            Login
          </Link>
        </p>
        <h1 className="signup__title">Create account</h1>
        <form
          onSubmit={signUpUser}
          action="signUpUser"
          className="signup__form"
        >
          <FormInput
            label="Full Name"
            name="fullName"
            type="text"
            handleInputChange={handleInputChange}
            value={users.fullName}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            handleInputChange={handleInputChange}
            value={users.email}
          />
          <div className="signup__form__passwords">
            <FormInput
              label="Password"
              name="password"
              type="password"
              handleInputChange={handleInputChange}
              value={users.password}
            />
            <FormInput
              label="Confirm"
              name="confirmPassword"
              type="password"
              handleInputChange={handleInputChange}
              value={users.confirmPassword}
            />
          </div>
          <FormInput
            type="checkbox"
            label="By creating an account,you agree to the Terms of Service and Conditions,and Privacy Policy"
            id="signup__form__checkbox"
          />
          <input type="submit" value="Create account" />
        </form>
        <p className="signup__or">or</p>
        <div className="signup__buttons">
          <Button label="Continue with Google" icon={<FcGoogle />} />
          <Button label="Continue with Facebook" icon={<FaFacebookF />} />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
