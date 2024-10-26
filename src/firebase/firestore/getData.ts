import firebase_app from "../config";
import { getFirestore, doc, getDoc, getDocs, collection } from "firebase/firestore";

const db = getFirestore(firebase_app)

export async function getDocuments(collectionName:string) {
    return getDocs(collection(db, collectionName));
}