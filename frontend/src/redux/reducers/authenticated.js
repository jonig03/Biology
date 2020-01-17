import { SET_AUTHENTICATED } from "../types/authenticated";

const initialState = {
  authenticated: "Loading",
  fullName: "",
  username: "",
  userID: ""
};

const is_authenticated = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        authenticated: action.isAuthenticated,
        fullName: action.fullName,
        username: action.username,
        userID: action.userID
      };
    default:
      return state;
  }
};

export default is_authenticated;
