import { useContext } from "react";

import { MultiCartContext } from "@/contexts/public/MultiCartProvider";

export function useMultiCart() {
  const context = useContext(MultiCartContext);

  if (!context) {
    throw new Error("useMultiCart must be used within a MultiCartProvider.");
  }

  return context;
}
