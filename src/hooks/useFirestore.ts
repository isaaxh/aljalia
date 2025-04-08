import { FIREBASE_DB } from '@/lib/firebase.client'
import { doc, DocumentData, getDoc, setDoc, updateDoc, deleteDoc, WithFieldValue, getDocs, collection } from 'firebase/firestore'


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

    const modifyDoc = async (collectionName: string, id: string, fieldName: string, newValue: string): Promise<void> => {
        const docRef = doc(FIREBASE_DB, collectionName, id);

        await updateDoc(docRef, {
            [fieldName]: newValue
        });
    }

    const getAllDocs = async <T>(collectionName: string): Promise<T[]> => {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, collectionName));
        const documents: T[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        } as T))
        return documents
    }

    const deleteDoc = async (collectionName: string, id: string) => {
    }


    return { addDoc, getDocById, getAllDocs, modifyDoc, deleteDoc }
}