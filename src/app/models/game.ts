import { Timestamp } from "firebase/firestore";

export interface Game{
    id: string;
    createdAt: number;
    endedAt?: number;
}