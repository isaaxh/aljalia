"use client";

import { useFirestore } from "@/hooks/useFirestore";
import { FIREBASE_AUTH } from "@/lib/firebase.client";
import { deleteUserToken } from "@/lib/firebaseAuth";
import { TUserData } from "@/lib/types";
import { DecodedIdToken } from "firebase-admin/auth";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export type AuthContextType = {
  user: User | null;
  userData: TUserData | null;
  logOut: () => void;
  decodedUser: DecodedIdToken | null;
  setDecodedUser: Dispatch<SetStateAction<DecodedIdToken | null>>;
  validToken: string;
  setValidToken: Dispatch<SetStateAction<string>>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  logOut: () => {},
  decodedUser: null,
  setDecodedUser: () => {},
  validToken: "",
  setValidToken: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<TUserData | null>(null);
  const [decodedUser, setDecodedUser] = useState<DecodedIdToken | null>(null);
  const [validToken, setValidToken] = useState("");
  const { getDocById } = useFirestore();

  const logOut = () => {
    signOut(FIREBASE_AUTH);
    setDecodedUser(null);
    setUserData(null);
    deleteUserToken();
    router.replace("/");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      setUser(authUser || null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setUserData(null);
        return;
      }
      try {
        const data = await getDocById<TUserData>("users", user.uid);
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching document:", error);
        setUserData(null);
      }
    };

    fetchUserData();
  }, [user]);

  const value = {
    user,
    userData,
    logOut,
    decodedUser,
    setDecodedUser,
    validToken,
    setValidToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
