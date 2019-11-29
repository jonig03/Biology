import { GAME_CHANGE } from "../types/game";

const initialState = {
  squares: Array(9).fill(null),
  isXNext: true
};

const facts = (state = initialState, action) => {
  switch (action.type) {
    case GAME_CHANGE:
      const squares = state.squares.slice();
      state.isXNext ? (squares[i] = "X") : (squares[i] = "O");
      return { squares, isXNext: !this.state.isXNext };
    default:
      return state;
  }
};

export default facts;
