import { Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import ClearFiltersButton from "../common/ClearFiltersButton";

import { useCategoryFilters } from "@/contexts/CategoryFiltersProvider";
import { useRestaurants } from "@/contexts/RestaurantsProvider";

export default function RestaurantHeadingContainer() {
  const { allCategories } = useCategoryFilters();
  const { movCounts } = useRestaurants();

  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilters = searchParams.getAll("filter");
  const nonCategoryFilters = currentFilters.filter(
    (f) => !allCategories.some((c) => c.slug === f),
  );

  function handleClearSidebarFilters() {
    // Take all the filters that are category filters
    const categoryFilters = currentFilters.filter((f) =>
      allCategories.some((c) => c.slug === f),
    );

    setSearchParams({
      lat: searchParams.getAll("lat"),
      lon: searchParams.getAll("lon"),
      filter: categoryFilters,
      mov: [],
      sort_by: searchParams.getAll("sort_by"),
      view_type: searchParams.getAll("view_type"),
      q: searchParams.getAll("q"),
    });
  }

  return (
    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
      <Typography component="span" variant="h6" sx={{ fontWeight: 700 }}>
        {movCounts.all} places
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
