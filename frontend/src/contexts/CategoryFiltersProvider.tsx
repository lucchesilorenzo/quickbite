import { createContext, useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { useGetCategories } from "@/hooks/react-query/categories/useGetCategories";
import { Category, CategoryWithSelected } from "@/types";

type CategoryFiltersProviderProps = {
  children: React.ReactNode;
};

type CategoryFiltersContext = {
  visibleCategories: CategoryWithSelected[];
  allCategories: CategoryWithSelected[];
  openCategoriesDialog: boolean;
  isLoadingCategories: boolean;
  setOpenCategoriesDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleStatusChange: (category: CategoryWithSelected) => void;
};

export const CategoryFiltersContext =
  createContext<CategoryFiltersContext | null>(null);

export default function CategoryFiltersProvider({
  children,
}: CategoryFiltersProviderProps) {
  const { data: categories = [], isLoading: isLoadingCategories } =
    useGetCategories();

  const [allCategories, setAllCategories] = useState<CategoryWithSelected[]>(
    [],
  );
  const [visibleCategories, setVisibleCategories] = useState<
    CategoryWithSelected[]
  >([]);

  const [openCategoriesDialog, setOpenCategoriesDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const filters = searchParams.getAll("filter");

    const updatedCategories = categories.map((c) =>
      filters.includes(c.slug) ? { ...c, selected: true } : c,
    ) as CategoryWithSelected[];

    setAllCategories(updatedCategories);
    setVisibleCategories(
      updatedCategories.filter((c) => c.is_default || c.selected),
    );
  }, [searchParams, categories]);

  function handleStatusChange(category: Category) {
    // Toggle selected status
    const updatedCategories = allCategories.map((c) =>
      c.name === category.name ? { ...c, selected: !c.selected } : c,
    );
    setAllCategories(updatedCategories);

    // Keep all categories that are default or selected
    const newVisibleCategories = updatedCategories.filter(
      (c) => c.is_default || c.selected,
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
    <CategoryFiltersContext.Provider
      value={{
        visibleCategories,
        allCategories,
        openCategoriesDialog,
        isLoadingCategories,
        setOpenCategoriesDialog,
        handleStatusChange,
      }}
    >
      {children}
    </CategoryFiltersContext.Provider>
  );
}
