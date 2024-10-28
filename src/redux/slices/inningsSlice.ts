import { GameTeams } from "@/app/enums/GameTeams";
import { createSlice } from "@reduxjs/toolkit";

const inningsSlice = createSlice({
    name: "inning",
    initialState: {
        teams: [],
        battingTeam: GameTeams.None,
        bowlingTeam: GameTeams.None,
    },
    reducers: {
        setTeams: (state, action) => {
            state.teams = action.payload;
        },
        setBattingTeam: (state, action) => {
            state.battingTeam = action.payload;
            state.bowlingTeam = (state.battingTeam === GameTeams.Team1 ? GameTeams.Team2 : GameTeams.Team1)
        },
        
    }
});

export const { setTeams, setBattingTeam } = inningsSlice.actions;
export default inningsSlice.reducer;