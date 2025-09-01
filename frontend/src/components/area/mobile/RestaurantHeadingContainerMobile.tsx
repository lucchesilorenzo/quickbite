import { Box, Button, Paper, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import ClearFiltersButton from "../common/ClearFiltersButton";

import { useRestaurant } from "@/hooks/contexts/useRestaurant";

type RestaurantHeadingContainerMobileProps = {
  isThereAnyFilter: boolean;
  onCloseDialog: () => void;
  setIsThereAnyFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RestaurantHeadingContainerMobile({
  isThereAnyFilter,
  onCloseDialog,
  setIsThereAnyFilter,
}: RestaurantHeadingContainerMobileProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { movCounts } = useRestaurant();

  const currentViewType = searchParams.getAll("view_type");

  function handleClearAllFilters() {
    setSearchParams({
      lat: searchParams.getAll("lat"),
      lon: searchParams.getAll("lon"),
      filter: [],
      mov: [],
      sort_by: [],
      view_type: currentViewType,
      q: [],
    });

    setIsThereAnyFilter(false);
  }

  return (
    <Stack spacing={2} sx={{ alignItems: "center", pb: 12 }}>
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
          {movCounts.all} places
        </Button>
      </Paper>
    </Stack>
  );
}
