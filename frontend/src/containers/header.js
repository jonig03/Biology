import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "../css/home/header.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import AuthenticationButtons from "./authenticationButtons";
import { useSelector } from "react-redux";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const Header = () => {
  const { authenticated, username } = useSelector(
    state => state
  ).isAuthenticated;
  const [current, setCurrent] = useState("More");
  const [open, setOpen] = useState(false);

  console.log(username);

  const handleNewCurrent = e => {
    setCurrent(e.target.text);
  };
  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          BiologyPen
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/startLearning" className="nav-link" role="button">
              Start Learning Now
            </Link>

            <Link to="/profiles" className="nav-link" role="button">
              Profiles
            </Link>
            <ClickAwayListener onClickAway={handleClickAway}>
              <NavDropdown title={current} id="collasible-nav-dropdown">
                <Link
                  to="/game"
                  className="dropdown-item"
                  role="button"
                  onClick={handleNewCurrent}
                >
                  Game
                </Link>
                <Link
                  to="/studyProgress"
                  className="dropdown-item"
                  role="button"
                  onClick={handleNewCurrent}
                >
                  Study Progress
                </Link>
                <Link
                  to="/quiz"
                  className="dropdown-item"
                  role="button"
                  onClick={handleNewCurrent}
                >
                  Quiz
                </Link>
                <Link
                  to="/createQuiz"
                  className="dropdown-item"
                  role="button"
                  onClick={handleNewCurrent}
                >
                  Create Quiz
                </Link>
                <Link
                  to="/biologyHistory"
                  className="dropdown-item"
                  role="button"
                  onClick={handleNewCurrent}
                >
                  Biology History
                </Link>
                {authenticated ? (
                  <React.Fragment>
                    <NavDropdown.Divider />
                    <Link
                      to={`/profile/${username}`}
                      className="dropdown-item"
                      role="button"
                      onClick={handleNewCurrent}
                    >
                      Profile
                    </Link>
                  </React.Fragment>
                ) : null}
              </NavDropdown>
            </ClickAwayListener>
          </Nav>
          <Nav>
            <AuthenticationButtons />
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
