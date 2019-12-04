import { ADD_STUDY } from "../types/addStudyProgress";

const addTopic = (id, content) => {
  return {
    type: ADD_STUDY,
    id,
    name: content
  };
};

export default addTopic;
