import { GameTeams } from "@/app/enums/GameTeams";
import { createSlice } from "@reduxjs/toolkit";

const inningsSlice = createSlice({
    name: "inning",
    initialState: {
        teams: [],
        battingTeam: GameTeams.None,
        bowlingTeam: GameTeams.None,
        currentOver: 0,
        isOverInProgress: false,
        finishedOvers: 0
    },
    reducers: {
        setTeams: (state, action) => {
            state.teams = action.payload;
        },
        setBattingTeam: (state, action) => {
            state.battingTeam = action.payload;
            state.bowlingTeam = (state.battingTeam === GameTeams.Team1 ? GameTeams.Team2 : GameTeams.Team1)
        },
        startOver: (state) => {
            if(state.isOverInProgress){
                return;
            }
            state.currentOver = state.currentOver + 1;
            state.isOverInProgress = true;
        },
        finishOver: (state) => {
            state.finishedOvers = state.finishedOvers + 1;
            state.isOverInProgress = false;
        }
        
    }
});

export const { setTeams, setBattingTeam, startOver, finishOver } = inningsSlice.actions;
export default inningsSlice.reducer;