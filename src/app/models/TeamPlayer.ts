import { UUID } from "crypto";
import { GameTeams } from "../enums/GameTeams";

export interface TeamPlayer{
    id: UUID;
    name: string;
    team: GameTeams;
    isGuest?: boolean;
}