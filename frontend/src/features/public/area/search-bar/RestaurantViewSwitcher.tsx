import { useEffect } from "react";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MapIcon from "@mui/icons-material/Map";
import { Box, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSearchParams } from "react-router-dom";

import { useRestaurants } from "@/contexts/RestaurantsProvider";

export default function RestaurantViewSwitcher() {
  const { viewMap, setViewMap } = useRestaurants();

  const [searchParams, setSearchParams] = useSearchParams();

  function handleViewMapClick() {
    // Use a variable to avoid getting an outdated value from the hook
    const updatedViewMap = !viewMap;

    setSearchParams({
      lat: searchParams.getAll("lat"),
      lon: searchParams.getAll("lon"),
      filter: searchParams.getAll("filter"),
      mov: searchParams.getAll("mov"),
      sort_by: searchParams.getAll("sort_by"),
      view_type: updatedViewMap ? "map" : [],
      q: searchParams.getAll("q"),
    });

    setViewMap((prev) => !prev);
  }

  useEffect(() => {
    const viewType = searchParams.get("view_type");

    setViewMap(viewType === "map");
  }, [searchParams, setViewMap]);

  return (
    <Box>
      <IconButton
        size="large"
        color="inherit"
        sx={{
          bgcolor: grey[100],
          "&:hover": { bgcolor: grey[200] },
          display: { xs: "none", lg: "flex" },
        }}
        onClick={handleViewMapClick}
      >
        {viewMap ? <FormatListBulletedIcon /> : <MapIcon />}
      </IconButton>

      <IconButton
        size="small"
        sx={{
          "&:hover": { backgroundColor: "transparent" },
          display: { xs: "flex", lg: "none" },
          p: 0,
        }}
        onClick={handleViewMapClick}
      >
        <MapIcon fontSize="small" color="primary" />
      </IconButton>
    </Box>
  );
}
