import { GameTeams } from "@/app/enums/GameTeams";
import { TeamPlayer } from "@/app/models/teamPlayer";
import { createSlice } from "@reduxjs/toolkit";

export interface InitialState {
    teams: TeamPlayer[];
    battingTeam: GameTeams;
    bowlingTeam: GameTeams;
    currentOver: number;
    isOverInProgress: boolean,
    finishedOvers: number;
    score: {}
}

const initialState: InitialState = {
    teams: [],
    battingTeam: GameTeams.None,
    bowlingTeam: GameTeams.None,
    currentOver: -1,
    isOverInProgress: false,
    finishedOvers: 0,
    score: {}
};

const inningsSlice = createSlice({
    name: "inning",
    initialState: initialState,
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
            let co = state.currentOver;
            let score = {... state.score};
            score[co] = Array(6).fill(0);
            state.score = score;
            state.isOverInProgress = true;
        },
        finishOver: (state) => {
            state.finishedOvers = state.finishedOvers + 1;
            state.isOverInProgress = false;
        },
        setScore: (state, action) => {
            let co = state.currentOver;
            let score = {... state.score};
            score[co][action.payload.index] = action.payload.value;
        }
        
    }
});

export const { setTeams, setBattingTeam, startOver, finishOver, setScore } = inningsSlice.actions;
export default inningsSlice.reducer;