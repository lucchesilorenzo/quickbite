import { Stack, Switch, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const switchFilters = [
  { label: "Open Now", key: "open_now" },
  { label: "New", key: "new" },
  { label: "Free Delivery", key: "free_delivery" },
];

export default function RestaurantSwitchFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilters = searchParams.getAll("filter");

  function handleSwitchToggle(e: React.ChangeEvent<HTMLInputElement>) {
    const updatedFilters = e.target.checked
      ? [...currentFilters, e.target.name]
      : currentFilters.filter((f) => f !== e.target.name);

    setSearchParams({
      lat: searchParams.getAll("lat"),
      lon: searchParams.getAll("lon"),
      filter: updatedFilters,
      mov: searchParams.getAll("mov"),
      sort_by: searchParams.getAll("sort_by"),
      view_type: searchParams.getAll("view_type"),
      q: searchParams.getAll("q"),
    });
  }

  return (
    <Stack spacing={2}>
      {switchFilters.map((filter) => (
        <Stack
          key={filter.key}
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography component="span" variant="h6" sx={{ fontWeight: 700 }}>
            {filter.label}
          </Typography>

          <Switch
            name={filter.key}
            checked={currentFilters.includes(filter.key)}
            onChange={handleSwitchToggle}
          />
        </Stack>
      ))}
    </Stack>
  );
}
