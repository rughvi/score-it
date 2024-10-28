import { createSlice } from "@reduxjs/toolkit";

const inningsSlice = createSlice({
    name: "inning",
    initialState: {
        teams: [],
        battingTeam: null,
    },
    reducers: {
        setTeams: (state, action) => {
            state.teams = action.payload;
        },
        setBattingTeam: (state, action) => {
            state.battingTeam = action.payload;
        },
        
    }
});

export const { setTeams, setBattingTeam } = inningsSlice.actions;
export default inningsSlice.reducer;