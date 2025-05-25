import { Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import ClearFiltersButton from "../content/ClearFiltersButton";

import { useCategoryFilters } from "@/hooks/contexts/useCategoryFilters";
import { useRestaurant } from "@/hooks/contexts/useRestaurant";

export default function RestaurantHeadingContainer() {
  const { allCategories } = useCategoryFilters();
  const { restaurants } = useRestaurant();

  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilters = searchParams.getAll("filter");
  const currentSort = searchParams.getAll("sort_by");
  const currentViewType = searchParams.getAll("view_type");

  const nonCategoryFilters = currentFilters.filter(
    (f) => !allCategories.some((c) => c.slug === f),
  );

  function handleClearSidebarFilters() {
    // Take all the filters that are category filters
    const categoryFilters = currentFilters.filter((f) =>
      allCategories.some((c) => c.slug === f),
    );

    setSearchParams({
      filter: categoryFilters,
      sort_by: currentSort,
      view_type: currentViewType,
    });
  }

  return (
    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
      <Typography component="span" variant="h6" sx={{ fontWeight: 700 }}>
        {restaurants.length} places
      </Typography>

      {nonCategoryFilters.length > 0 && (
        <ClearFiltersButton
          type="sidebar"
          onHandleClick={handleClearSidebarFilters}
        >
          Clear
        </ClearFiltersButton>
      )}
    </Stack>
  );
}
