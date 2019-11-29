import { SHOW_FACT } from "../types/facts";

const initialState = {
  isFactVisible: false
};

const facts = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_FACT:
      return { ...state, isFactVisible: action.isFactVisible };
    default:
      return state;
  }
};

export default facts;
