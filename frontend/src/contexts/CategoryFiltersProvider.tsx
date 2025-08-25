import { createContext, useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { useGetCategories } from "@/hooks/react-query/public/categories/useGetCategories";
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
  const { data: categories, isLoading: isLoadingCategories } =
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
    if (!categories.length) return;

    const filters = searchParams.getAll("filter");

    const updatedCategories = categories.map((c) => ({
      ...c,
      selected: filters.includes(c.slug),
    }));

    setAllCategories(updatedCategories);
    setVisibleCategories(
      updatedCategories.filter((c) => c.is_default || c.selected),
    );
  }, [searchParams, categories]);

  function handleStatusChange(category: Category) {
    const updatedCategories = allCategories.map((c) =>
      c.slug === category.slug ? { ...c, selected: !c.selected } : c,
    );
    setAllCategories(updatedCategories);

    // Update query params
    const currentFilters = searchParams.getAll("filter");

    // Take all the filters that are category filters
    const selectedFilters = updatedCategories
      .filter((c) => c.selected)
      .map((c) => c.slug);

    // Take all the filters that are not category filters
    const nonCategoryFilters = currentFilters.filter(
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
