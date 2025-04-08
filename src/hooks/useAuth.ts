"use client";

import { AuthContext } from "@/services/contexts/AuthContext";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);
