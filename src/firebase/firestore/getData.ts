import firebase_app from "../config";
import { getFirestore, doc, getDoc, getDocs, collection } from "firebase/firestore";

const db = getFirestore(firebase_app)

export function getPlayers() {
    return getDocs(collection(db, 'players'));
}