import { useContext } from "react";

import { AddressContext } from "@/contexts/AddressProvider";

export function useAddress() {
  const context = useContext(AddressContext);

  if (!context) {
    throw new Error("useAddress must be used within a AddressProvider.");
  }

  return context;
}
