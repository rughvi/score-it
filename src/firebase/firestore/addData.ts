import { Game } from "@/app/models/game";
import firebase_app from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)

export function addGame(colllection: string, game: Game) {
    return setDoc(doc(db, colllection, game.id), 
                {createdAt: new Date(game.createdAt)}, 
                { merge: false}
            );
}