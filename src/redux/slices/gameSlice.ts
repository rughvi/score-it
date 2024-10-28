import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: "game",
    initialState: {
        gameId: null
    },
    reducers: {
        startGame: (state, action) => {
            state.gameId = action.payload;
        },
        endGame: (state, action) => {
            state.gameId = null;
        }
    }
})

export const { startGame, endGame } = gameSlice.actions;
export default gameSlice.reducer;