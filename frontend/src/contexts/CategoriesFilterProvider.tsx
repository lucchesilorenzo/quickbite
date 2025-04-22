import { createContext, useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { categories } from "@/lib/data";
import { Category } from "@/types";

type CategoriesFilterProviderProps = {
  children: React.ReactNode;
};

type CategoriesFilterContext = {
  visibleCategories: Category[];
  allCategories: Category[];
  openCategoriesDialog: boolean;
  setOpenCategoriesDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleStatusChange: (category: Category) => void;
};

export const CategoriesFilterContext =
  createContext<CategoriesFilterContext | null>(null);

export default function CategoriesFilterProvider({
  children,
}: CategoriesFilterProviderProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openCategoriesDialog, setOpenCategoriesDialog] = useState(false);
  const [allCategories, setAllCategories] = useState(categories);
  const [visibleCategories, setVisibleCategories] = useState(
    categories.filter((c) => c.default),
  );

  useEffect(() => {
    const filters = searchParams.getAll("filter");

    const updatedCategories = categories.map((c) =>
      filters.includes(c.slug) ? { ...c, selected: true } : c,
    );

    setAllCategories(updatedCategories);
    setVisibleCategories(
      updatedCategories.filter((c) => c.default || c.selected),
    );
  }, [searchParams]);

  function handleStatusChange(category: Category) {
    // Toggle selected status
    const updatedCategories = allCategories.map((c) =>
      c.name === category.name ? { ...c, selected: !c.selected } : c,
    );
    setAllCategories(updatedCategories);

    // Keep all categories that are default or selected
    const newVisibleCategories = updatedCategories.filter(
      (c) => c.default || c.selected,
    );
    setVisibleCategories(newVisibleCategories);

    // Update URL
    const filters = updatedCategories
      .filter((c) => c.selected)
      .map((c) => c.slug);
    setSearchParams({ filter: filters });

    setOpenCategoriesDialog(false);
  }

  return (
    <CategoriesFilterContext.Provider
      value={{
        visibleCategories,
        allCategories,
        openCategoriesDialog,
        setOpenCategoriesDialog,
        handleStatusChange,
      }}
    >
      {children}
    </CategoriesFilterContext.Provider>
  );
}
