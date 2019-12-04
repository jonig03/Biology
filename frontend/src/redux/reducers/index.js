import { combineReducers } from "redux";
import showFactReducer from "./facts";
import studyProgressReducer from "./studyProgress";

const rootReducer = combineReducers({
  showFact: showFactReducer,
  studyProgress: studyProgressReducer
});

export default rootReducer;
