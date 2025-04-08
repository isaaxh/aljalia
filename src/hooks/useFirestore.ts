import { FIREBASE_DB } from '@/lib/firebase.client'
import { doc, DocumentData, getDoc, setDoc, WithFieldValue } from 'firebase/firestore'


export const useFirestore = () => {

    const addDoc = async <T extends DocumentData>(collectionName: string, id: string, data: WithFieldValue<T>) => {
        const docRef = doc(FIREBASE_DB, collectionName, id);
        await setDoc(docRef, data);
    }


    const getDocById = async <T>(collectionName: string, id: string): Promise<T | null> => {
        const docRef = doc(FIREBASE_DB, collectionName, id)
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
            console.log("No such document!");
            return null
        } else {
            return docSnap.data() as T
        }
    }
    const getAllDocs = async () => { }
    const deleteDoc = async () => { }
    const updateDoc = async () => { }

    return { addDoc, getDocById, getAllDocs, deleteDoc, updateDoc }
}