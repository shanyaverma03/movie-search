import { createStore } from "redux";

const initialState = {
  movie: [{ id: "", title: "", year: "", rank: "", poster: "" }],
};

const movieReducer = (state = initialState, action) => {
  if (action.type === "select") {
    return {
      movie: action.value,
    };
  }

  return state;
};

const store = createStore(movieReducer);

export default store;
