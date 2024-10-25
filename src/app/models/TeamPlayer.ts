import { GameTeams } from "../enums/GameTeams";

export interface TeamPlayer{
    id: number;
    name: string;
    team: GameTeams;
}