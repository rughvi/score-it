import { Timestamp } from "firebase/firestore";
import { TeamPlayer } from "./teamPlayer";

export interface Game{
    id: string;
    createdAt: number;
    endedAt?: number;
    players? : TeamPlayer[]
}