"use client";

import { useAuth } from "@/hooks/useAuth";
import { useFirestore } from "@/hooks/useFirestore";
import { TAdmin, TAdminList } from "@/lib/types";
import { createContext, useEffect, useState } from "react";

export type GlobalContextType = {
  adminList: TAdminList;
};

export const GlobalContext = createContext<GlobalContextType>({
  adminList: [],
});

function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [adminList, setAdminList] = useState<TAdminList | []>([]);
  const { getAllDocs } = useFirestore();
  const { user } = useAuth();

  useEffect(() => {
    const fetchAdminList = async () => {
      if (!user) {
        setAdminList([]);
        return;
      }
      try {
        const data = await getAllDocs<TAdmin>("adminList");
        setAdminList(data);
      } catch (error) {
        console.error("Error fetching document:", error);
        setAdminList([]);
      }
    };

    fetchAdminList();
  }, [user]);

  const value = {
    adminList,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default GlobalProvider;
