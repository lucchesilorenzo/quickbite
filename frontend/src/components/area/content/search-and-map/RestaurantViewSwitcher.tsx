import { useEffect } from "react";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MapIcon from "@mui/icons-material/Map";
import { Box, IconButton } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { useRestaurant } from "@/hooks/contexts/useRestaurant";

export default function RestaurantViewSwitcher() {
  const { viewMap, setViewMap } = useRestaurant();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleViewMapClick() {
    // Use a variable to avoid getting an outdated value from the hook
    const updatedViewMap = !viewMap;

    // Update query params
    const currentFilters = searchParams.getAll("filter");
    const currentMOV = searchParams.getAll("mov");
    const currentSort = searchParams.getAll("sort_by");

    setSearchParams({
      filter: currentFilters,
      mov: currentMOV,
      sort_by: currentSort,
      view_type: updatedViewMap ? "map" : [],
    });

    setViewMap((prev) => !prev);
  }

  useEffect(() => {
    const viewType = searchParams.get("view_type");

    if (viewType === "map") {
      setViewMap(true);
    }
  }, [searchParams, setViewMap]);

  return (
    <Box>
      <IconButton
        color="inherit"
        sx={{
          bgcolor: "grey.100",
          "&:hover": {
            bgcolor: "grey.200",
          },
        }}
        size="large"
        onClick={handleViewMapClick}
      >
        {viewMap ? <FormatListBulletedIcon /> : <MapIcon />}
      </IconButton>
    </Box>
  );
}
