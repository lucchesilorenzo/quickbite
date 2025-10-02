import { useContext } from "react";

import { CategoryFiltersContext } from "@/contexts/public/CategoryFiltersProvider";

export function useCategoryFilters() {
  const context = useContext(CategoryFiltersContext);

  if (!context) {
    throw new Error(
      "useCategoriesFilter must be used within a CategoriesFilterProvider.",
    );
  }

  return context;
}
