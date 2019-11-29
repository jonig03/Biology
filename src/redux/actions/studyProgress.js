import { TOGGLE_TOPIC } from "../types/studyProgress";

const topicLearned = id => {
  return {
    type: TOGGLE_TOPIC,
    id
  };
};

export default topicLearned;
