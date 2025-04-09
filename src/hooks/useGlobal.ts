
"use client";

import { GlobalContext } from "@/services/contexts/GlobalContext";
import { useContext } from "react";

export const useGlobal = () => useContext(GlobalContext);
