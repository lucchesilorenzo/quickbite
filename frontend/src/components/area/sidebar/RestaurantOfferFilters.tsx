import { useEffect, useMemo, useState } from "react";

import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import HeadingWithTooltip from "@/components/common/HeadingWithTooltip";
import { useRestaurant } from "@/hooks/contexts/useRestaurant";

export default function RestaurantOfferFilters() {
  const { originalRestaurants } = useRestaurant();
  const [searchParams, setSearchParams] = useSearchParams();
  const [checked, setChecked] = useState<Record<string, boolean>>({
    with_discounts: false,
  });

  const offerFilters = useMemo(
    () => [
      {
        label: "Deals",
        key: "with_discounts",
        count: originalRestaurants.filter((r) => r.discount).length,
      },
    ],
    [originalRestaurants],
  );

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    setChecked((prev) => ({ ...prev, [e.target.name]: e.target.checked }));

    // Update query params
    const currentFilters = searchParams.getAll("filter");
    const currentMOV = searchParams.getAll("mov");
    const currentSort = searchParams.getAll("sort_by");
    const currentViewType = searchParams.getAll("view_type");

    const updatedFilters = e.target.checked
      ? [...currentFilters, e.target.name]
      : currentFilters.filter((f) => f !== e.target.name);

    setSearchParams({
      filter: updatedFilters,
      mov: currentMOV,
      sort_by: currentSort,
      view_type: currentViewType,
    });
  }

  useEffect(() => {
    const filters = searchParams.getAll("filter");

    const initialState = offerFilters.reduce(
      (acc, filter) => {
        acc[filter.key] = filters.includes(filter.key);
        return acc;
      },
      {} as Record<string, boolean>,
    );

    setChecked(initialState);
  }, [searchParams, offerFilters]);

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
                checked={checked[filter.key]}
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
