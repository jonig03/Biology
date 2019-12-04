import React from "react";
import { Link } from "react-router-dom";
import "../css/home/header.css";

const Header = () => {
  return (
    <header>
      <div className="container containerHeader">
        <h1>
          <Link to="/">Logo</Link>
        </h1>
        <nav>
          <span className="headerLinks">
            <Link to="/quiz">Quiz</Link>
          </span>
          <span className="headerLinks">
            <Link to="/createQuiz">Create Quiz</Link>
          </span>
          <span className="headerLinks">
            <Link to="/biologyHistory">Biology History</Link>
          </span>
          <span className="headerLinks">
            <Link to="/studyProgress">Study Progress</Link>
          </span>
          <span className="headerLinks">
            <Link to="/game">Game</Link>
          </span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
