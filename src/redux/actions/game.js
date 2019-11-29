import { GAME_CHANGE } from "../types/addStudyProgress";

const MOVE_MADE = (id, whosMove) => {
  return {
    type: GAME_CHANGE,
    whosMove
  };
};

export default addTopic;
