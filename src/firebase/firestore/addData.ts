import { Game } from "@/app/models/game";
import firebase_app from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { TeamPlayer } from "@/app/models/teamPlayer";

const db = getFirestore(firebase_app)

export async function addGame(colllection: string, game: Game) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(db, colllection, game.id), 
                            {createdAt: new Date(game.createdAt)}, 
                            { merge: false}
                        );
    } catch (e) {
        error = e;
    }
    return { result, error };
}

export async function addTeamsToGame(gameId: string, players: TeamPlayer[]){
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(db, "games", gameId), {players}, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}