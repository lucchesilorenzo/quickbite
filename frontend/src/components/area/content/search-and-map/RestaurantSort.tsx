import { useEffect, useState } from "react";

import { Box, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const sortOptions = [
  { value: "best-match", label: "Best match" },
  { value: "review_rating", label: "Reviews" },
  { value: "distance", label: "Distance" },
  { value: "minimum_order_value", label: "Minimum order amount" },
  { value: "delivery_time", label: "Estimated delivery time" },
  { value: "delivery_fee", label: "Delivery costs" },
];

export default function RestaurantSort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState("best-match");

  const currentSort = searchParams.get("sort_by");

  function handleSortChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);

    // Update query params
    const currentFilters = searchParams.getAll("filter");
    const currentMOV = searchParams.getAll("mov");
    const updatedSort = e.target.value !== "best-match" ? e.target.value : [];
    const currentViewType = searchParams.getAll("view_type");
    const currentSearchTerm = searchParams.getAll("q");

    setSearchParams({
      filter: currentFilters,
      mov: currentMOV,
      sort_by: updatedSort,
      view_type: currentViewType,
      q: currentSearchTerm,
    });
  }

  useEffect(() => {
    const sortBy = searchParams.get("sort_by");

    setValue(sortBy || "best-match");
  }, [searchParams]);

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "center", display: { xs: "none", lg: "flex" } }}
      >
        <Typography variant="subtitle2" component="h3" noWrap sx={{ pl: 1 }}>
          Sort by
        </Typography>

        <Box>
          <TextField
            id="sort-select"
            name="sort-select"
            select
            value={value}
            onChange={handleSortChange}
            sx={{
              minWidth: 250,
              "& .MuiSelect-select": {
                color: currentSort ? "text.primary" : "text.secondary",
              },
            }}
          >
            {sortOptions.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{ color: currentSort ? "text.primary" : "text.secondary" }}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Stack>

      <Box sx={{ display: { xs: "block", lg: "none" } }}>
        <Typography variant="subtitle2" component="h3" gutterBottom>
          Sort by
        </Typography>

        <TextField
          id="sort-select"
          name="sort-select"
          select
          value={value}
          fullWidth
          onChange={handleSortChange}
          sx={{
            "& .MuiSelect-select": {
              color: currentSort ? "text.primary" : "text.secondary",
            },
          }}
        >
          {sortOptions.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{ color: currentSort ? "text.primary" : "text.secondary" }}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </>
  );
}
