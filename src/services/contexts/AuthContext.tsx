"use client";

import { FIREBASE_AUTH } from "@/lib/firebase.client";
import { deleteUserToken } from "@/lib/firebaseAuth";
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
  logOut: () => void;
  decodedUser: DecodedIdToken | null;
  setDecodedUser: Dispatch<SetStateAction<DecodedIdToken | null>>;
  validToken: string;
  setValidToken: Dispatch<SetStateAction<string>>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  logOut: () => {},
  decodedUser: null,
  setDecodedUser: () => {},
  validToken: "",
  setValidToken: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [decodedUser, setDecodedUser] = useState<DecodedIdToken | null>(null);
  const [validToken, setValidToken] = useState("");

  const logOut = () => {
    signOut(FIREBASE_AUTH);
    setDecodedUser(null);
    deleteUserToken();
    router.replace("/");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user || null);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    logOut,
    decodedUser,
    setDecodedUser,
    validToken,
    setValidToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
