import { useContext } from "react";

import { AuthContext } from "@/contexts/public/AuthProvider";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider.");
  }

  return context;
}
