import { SET_AUTHENTICATED } from "../types/authenticated";

export const setIsAuthenticated = (
  isAuthenticated,
  fullName,
  username,
  userID
) => ({
  type: SET_AUTHENTICATED,
  isAuthenticated,
  fullName,
  username,
  userID
});

// export default setIsAuthenticated;
