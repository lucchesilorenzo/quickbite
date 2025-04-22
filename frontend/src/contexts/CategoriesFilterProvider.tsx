import { createContext, useState } from "react";

import { categories } from "@/lib/data";
import { Category } from "@/types";

type CategoriesFilterProviderProps = {
  children: React.ReactNode;
};

type CategoriesFilterContext = {
  visibleCategories: Category[];
  allCategories: Category[];
  handleStatusChange: (category: Category) => void;
};

export const CategoriesFilterContext =
  createContext<CategoriesFilterContext | null>(null);

export default function CategoriesFilterProvider({
  children,
}: CategoriesFilterProviderProps) {
  const [allCategories, setAllCategories] = useState(categories);
  const [visibleCategories, setVisibleCategories] = useState(
    categories.filter((c) => c.default),
  );

  function handleStatusChange(category: Category) {
    // Toggle selected status
    const updatedCategories = allCategories.map((c) =>
      c.name === category.name ? { ...c, selected: !c.selected } : c,
    );

    // Keep all categories that are default or selected
    const newVisibleCategories = updatedCategories.filter(
      (c) => c.default || c.selected,
    );

    setAllCategories(updatedCategories);
    setVisibleCategories(newVisibleCategories);
  }

  return (
    <CategoriesFilterContext.Provider
      value={{ visibleCategories, allCategories, handleStatusChange }}
    >
      {children}
    </CategoriesFilterContext.Provider>
  );
}
