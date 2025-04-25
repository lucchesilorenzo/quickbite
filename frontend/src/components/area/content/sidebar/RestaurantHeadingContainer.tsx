import { Link, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { useCategoryFilters } from "@/hooks/contexts/useCategoryFilters";

export default function RestaurantHeadingContainer() {
  const { allCategories } = useCategoryFilters();
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

    setSearchParams({ filter: categoryFilters });
  }

  return (
    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
      <Typography component="span" variant="h6" sx={{ fontWeight: "700" }}>
        12 places
      </Typography>

      {nonCategoryFilters.length > 0 && (
        <Link
          component="button"
          color="inherit"
          underline="always"
          sx={{ "&:hover": { textDecoration: "none" } }}
          onClick={handleClearSidebarFilters}
        >
          Clear
        </Link>
      )}
    </Stack>
  );
}
