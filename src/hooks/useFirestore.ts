import { FIREBASE_DB } from '@/lib/firebase.client'
import { TUserData } from '@/lib/types';
import { doc, getDoc, setDoc } from 'firebase/firestore'

type AddDocProps = {
    collectionName: string;
    id: string;
    data: {
        [key: string]: any;
    }
}

export const useFirestore = () => {

    const addDoc = async (collectionName: string, id: string, data: any) => {
        const docRef = doc(FIREBASE_DB, collectionName, id);
        await setDoc(docRef, data);
    }


    const getDocById = async (collectionName: string, id: string): Promise<TUserData | null> => {
        const docRef = doc(FIREBASE_DB, collectionName, id)
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
            console.log("No such document!");
            return null
        } else {
            return docSnap.data() as TUserData
        }
    }
    const getAllDocs = async () => { }
    const deleteDoc = async () => { }
    const updateDoc = async () => { }

    return { addDoc, getDocById, getAllDocs, deleteDoc, updateDoc }
}