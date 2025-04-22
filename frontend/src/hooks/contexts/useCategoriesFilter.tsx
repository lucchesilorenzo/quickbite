import { useContext } from "react";

import { CategoriesFilterContext } from "@/contexts/CategoriesFilterProvider";

export function useCategoriesFilter() {
  const context = useContext(CategoriesFilterContext);

  if (!context) {
    throw new Error(
      "useCategoriesFilter must be used within a CategoriesFilterProvider.",
    );
  }

  return context;
}
