import { combineReducers } from "redux";
import showFactReducer from "./facts";
import studyProgressReducer from "./studyProgress";
import authenticatedReducer from "./authenticated";

const rootReducer = combineReducers({
  showFact: showFactReducer,
  studyProgress: studyProgressReducer,
  isAuthenticated: authenticatedReducer
});

export default rootReducer;
