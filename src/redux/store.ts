import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slices/gameSlice";
import inningsReducer from "./slices/inningsSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    innings: inningsReducer,
  },
});