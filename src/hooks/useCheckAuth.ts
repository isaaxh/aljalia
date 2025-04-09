"use client";
import { useEffect, useState } from "react";
import { DecodedIdToken } from "firebase-admin/auth";
import { useAuth } from "./useAuth";

export const useCheckAuth = () => {
  const { decodedUser, setDecodedUser } = useAuth();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
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
          setDecodedUser(data.user);
          setLoading(false);
        } else {
          console.error("Auth failed:", data.error);
          setLoading(false);
        }
      } catch (error) {
        console.error("Auth request error:", error);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { decodedUser, loading };
};
