import { createContext, useContext, useMemo, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { useGetCategories } from "@/hooks/categories/useGetCategories";
import { CategoryWithSelected } from "@/types/category-types";

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

const CategoryFiltersContext = createContext<CategoryFiltersContext | null>(
  null,
);

export default function CategoryFiltersProvider({
  children,
}: CategoryFiltersProviderProps) {
  const { data: categories = [], isLoading: isLoadingCategories } =
    useGetCategories();

  const [searchParams, setSearchParams] = useSearchParams();
  const [openCategoriesDialog, setOpenCategoriesDialog] = useState(false);

  const activeFilters = searchParams.getAll("filter");

  const allCategories = useMemo<CategoryWithSelected[]>(() => {
    return categories.map((c) => ({
      ...c,
      selected: activeFilters.includes(c.slug),
    }));
  }, [categories, activeFilters]);

  const visibleCategories = useMemo(
    () => allCategories.filter((c) => c.is_default || c.selected),
    [allCategories],
  );

  function handleStatusChange(category: CategoryWithSelected) {
    const updatedCategories = allCategories.map((c) =>
      c.slug === category.slug ? { ...c, selected: !c.selected } : c,
    );

    const selectedFilters = updatedCategories
      .filter((c) => c.selected)
      .map((c) => c.slug);

    // Take all the filters that are not category filters
    const nonCategoryFilters = activeFilters.filter(
      (f) => !allCategories.some((c) => c.slug === f),
    );

    setSearchParams({
      lat: searchParams.getAll("lat"),
      lon: searchParams.getAll("lon"),
      filter: [...selectedFilters, ...nonCategoryFilters],
      mov: searchParams.getAll("mov"),
      sort_by: searchParams.getAll("sort_by"),
      view_type: searchParams.getAll("view_type"),
      q: searchParams.getAll("q"),
    });
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

export function useCategoryFilters() {
  const context = useContext(CategoryFiltersContext);

  if (!context) {
    throw new Error(
      "useCategoryFilters must be used within a CategoryFiltersProvider.",
    );
  }

  return context;
}
