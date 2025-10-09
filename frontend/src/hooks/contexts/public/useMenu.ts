import { useContext } from "react";

import { MenuContext } from "@/contexts/public/MenuProvider";

export function useMenu() {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider.");
  }

  return context;
}
