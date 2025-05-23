import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import ClearFiltersButton from "../content/ClearFiltersButton";

import { useCategoryFilters } from "@/hooks/contexts/useCategoryFilters";
import { useRestaurant } from "@/hooks/contexts/useRestaurant";

type RestaurantHeadingContainerProps = {
  isThereAnyFilter: boolean;
  onCloseDialog?: () => void;
  setIsThereAnyFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RestaurantHeadingContainer({
  isThereAnyFilter,
  onCloseDialog,
  setIsThereAnyFilter,
}: RestaurantHeadingContainerProps) {
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

  function handleClearAllFilters() {
    setSearchParams({ filter: [], mov: [], sort_by: [], view_type: [] });

    setIsThereAnyFilter(false);
  }

  return (
    <>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          display: { xs: "none", lg: "flex" },
        }}
      >
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

      <Stack
        spacing={2}
        sx={{
          display: { xs: "flex", lg: "none" },
          alignItems: "center",
          pb: 12,
        }}
      >
        <Box>
          {isThereAnyFilter && (
            <ClearFiltersButton
              type="sidebar"
              onHandleClick={handleClearAllFilters}
            >
              Clear
            </ClearFiltersButton>
          )}
        </Box>

        <Paper
          sx={{
            width: 1,
            position: "fixed",
            bottom: 0,
            borderRadius: 0,
            p: 2,
          }}
          elevation={4}
        >
          <Button
            onClick={onCloseDialog}
            variant="outlined"
            color="inherit"
            fullWidth
            sx={{
              borderRadius: 2,
              borderColor: "grey.300",
              textTransform: "none",
              textWrap: "nowrap",
              fontWeight: 700,
              p: 2,
              fontSize: 16,
            }}
          >
            {restaurants.length} places
          </Button>
        </Paper>
      </Stack>
    </>
  );
}
