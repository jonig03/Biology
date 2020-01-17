import React from "react";
import { ReactComponent as Loading } from "../svg/loading.svg";
import { useSelector, useDispatch } from "react-redux";
import { setIsAuthenticated } from "../redux/actions/authenticated";
import { Link } from "react-router-dom";

const AuthenticationButtons = () => {
  const dispatch = useDispatch();
  const { authenticated, username, fullName } = useSelector(
    state => state
  ).isAuthenticated;
  console.log(authenticated);
  const signOutHandler = () => {
    localStorage.removeItem("BiologyPen");
    dispatch(setIsAuthenticated(false));
  };
  if (authenticated === "Loading") return <Loading />;
  if (!authenticated)
    return (
      <React.Fragment>
        <Link to="/log-in" className="nav-link" role="button">
          Log in
        </Link>
        <Link to="/sign-up" className="nav-link" role="button">
          Sign up
        </Link>
      </React.Fragment>
    );
  if (authenticated)
    return (
      <React.Fragment>
        <Link className="nav-link" to={`/profile/${username}`}>
          Hello {fullName}
        </Link>
        <Link
          className="nav-link"
          to="/log-in"
          role="button"
          onClick={signOutHandler}
        >
          Sign-out
        </Link>
      </React.Fragment>
    );
};

export default AuthenticationButtons;
