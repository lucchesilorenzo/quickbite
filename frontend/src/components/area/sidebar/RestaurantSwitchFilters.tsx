import { useEffect, useState } from "react";

import { Stack, Switch, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const switchFilters = [
  { label: "Open Now", key: "open_now" },
  { label: "New", key: "new" },
  { label: "Free Delivery", key: "free_delivery" },
];

export default function RestaurantSwitchFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [checked, setChecked] = useState<Record<string, boolean>>({
    open_now: false,
    new: false,
    free_delivery: false,
  });

  function handleSwitchToggle(e: React.ChangeEvent<HTMLInputElement>) {
    setChecked((prev) => ({ ...prev, [e.target.name]: e.target.checked }));

    // Update query params
    const currentFilters = searchParams.getAll("filter");
    const currentMOV = searchParams.getAll("mov");
    const currentSort = searchParams.getAll("sort_by");

    const updatedFilters = e.target.checked
      ? [...currentFilters, e.target.name]
      : currentFilters.filter((f) => f !== e.target.name);

    setSearchParams({
      filter: updatedFilters,
      mov: currentMOV,
      sort_by: currentSort,
    });
  }

  useEffect(() => {
    const filters = searchParams.getAll("filter");

    const initialState = switchFilters.reduce(
      (acc, filter) => {
        acc[filter.key] = filters.includes(filter.key);
        return acc;
      },
      {} as Record<string, boolean>,
    );

    setChecked(initialState);
  }, [searchParams]);

  return (
    <Stack spacing={2}>
      {switchFilters.map((filter) => (
        <Stack
          key={filter.key}
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography component="span" variant="h6" sx={{ fontWeight: "700" }}>
            {filter.label}
          </Typography>

          <Switch
            name={filter.key}
            checked={checked[filter.key]}
            onChange={handleSwitchToggle}
          />
        </Stack>
      ))}
    </Stack>
  );
}
