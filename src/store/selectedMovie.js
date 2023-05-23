import { createStore } from "redux";

const movieReducer = (state = { movie: {} }, action) => {
  if (action.type === "select") {
    return {
      movie: state.movie,
    };
  }

  return state;
};

const store = createStore(movieReducer);

export default store;
