import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./Authentication/SignUp/SignUpPage";
import LoginPage from "./Authentication/Login/LoginPage";
import Dashboard from "./modules/Dashboard";
import NewGame from "./modules/CreateSession/NewGame";
import Session from "./modules/Session";
import "./styles/App.scss";
import ErrorPage from "./modules/ErrorPage";
import NewStory from "./modules/NewStory";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/new-game" element={<NewGame />} />
          <Route path="/session/:sessionId" element={<Session />} />
          <Route path="/new-story" element={<NewStory />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
