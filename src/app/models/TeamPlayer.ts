import { GameTeams } from "../enums/GameTeams";

export interface TeamPlayer{
    id: string;
    name: string;
    team: GameTeams;
    isGuest?: boolean;
}