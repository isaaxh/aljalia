import { useEffect } from "react";
import { DecodedIdToken } from "firebase-admin/auth";
import { useAuth } from "./useAuth";

export const useCheckAuth = () => {
  const { decodedUser, setDecodedUser } = useAuth();

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth", {
        headers: {
          "x-auth-token":
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("authToken="))
              ?.split("=")[1] || "",
        },
      });
      const data: DecodedIdToken = await res.json();

      if (data.success) {
        console.log("Authenticated User:", data.user);
        setDecodedUser(data.user);
      } else {
        console.error("Auth failed:", data.error);
      }
    } catch (error) {
      console.error("Auth request error:", error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { decodedUser, setDecodedUser };
};
