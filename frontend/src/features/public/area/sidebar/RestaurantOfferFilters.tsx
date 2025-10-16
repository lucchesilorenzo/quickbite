import { useMemo } from "react";

import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import HeadingWithTooltip from "@/components/HeadingWithTooltip";
import { useRestaurants } from "@/contexts/RestaurantsProvider";

export default function RestaurantOfferFilters() {
  const { offerCounts } = useRestaurants();

  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilters = searchParams.getAll("filter");

  const offerFilters = useMemo(
    () => [
      {
        label: "Deals",
        key: "with_discounts",
        count: offerCounts.with_discounts,
      },
    ],
    [offerCounts],
  );

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
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
    <Box>
      <HeadingWithTooltip
        headingText="Offers"
        tooltipMessage="Filter by Offers to find a delicious deal."
      />

      <FormGroup>
        {offerFilters.map((filter) => (
          <FormControlLabel
            key={filter.key}
            label={`${filter.label} (${filter.count})`}
            control={
              <Checkbox
                name={filter.key}
                checked={currentFilters.includes(filter.key)}
                onChange={handleCheckboxChange}
                disabled={!filter.count}
              />
            }
          />
        ))}
      </FormGroup>
    </Box>
  );
}
