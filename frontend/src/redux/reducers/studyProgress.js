import { TOGGLE_TOPIC } from "../types/studyProgress";
import { ADD_STUDY } from "../types/addStudyProgress";
import topics from "../../data/topics.json";

const initialState = {
  topics
};

const studyProgress = (state = initialState, action) => {
  let topics = state.topics;
  switch (action.type) {
    case TOGGLE_TOPIC:
      topics.map(topic => {
        if (topic.id === action.id) {
          topic.studied = !topic.studied;
          return true;
        }
        return false;
      });
      return { ...state, topics };
    case ADD_STUDY:
      console.log(action);
      let newStudy = {
        name: action.name,
        id: action.id
      };
      console.log(newStudy);
      topics.push(newStudy);
      return { ...state, topics };
    default:
      return state;
  }
};

export default studyProgress;
