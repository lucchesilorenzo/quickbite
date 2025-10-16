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

  const value = searchParams.get("sort_by") || "best-match";

  function handleSortChange(e: React.ChangeEvent<HTMLInputElement>) {
    const updatedSort = e.target.value !== "best-match" ? e.target.value : [];

    setSearchParams({
      lat: searchParams.getAll("lat"),
      lon: searchParams.getAll("lon"),
      filter: searchParams.getAll("filter"),
      mov: searchParams.getAll("mov"),
      sort_by: updatedSort,
      view_type: searchParams.getAll("view_type"),
      q: searchParams.getAll("q"),
    });
  }

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
                color:
                  value !== "best-match" ? "text.primary" : "text.secondary",
              },
            }}
          >
            {sortOptions.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{
                  color:
                    value !== "best-match" ? "text.primary" : "text.secondary",
                }}
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
          id="sort-select-mobile"
          name="sort-select-mobile"
          select
          value={value}
          fullWidth
          onChange={handleSortChange}
          sx={{
            "& .MuiSelect-select": {
              color: value !== "best-match" ? "text.primary" : "text.secondary",
            },
          }}
        >
          {sortOptions.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{
                color:
                  value !== "best-match" ? "text.primary" : "text.secondary",
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </>
  );
}
