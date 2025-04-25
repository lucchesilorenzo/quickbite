import { useEffect, useState } from "react";

import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import HeadingWithTooltip from "@/components/common/HeadingWithTooltip";

const offerFilters = [{ label: "Deals", key: "with_discounts" }];

export default function RestaurantOfferFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [checked, setChecked] = useState<Record<string, boolean>>({
    with_discounts: false,
  });

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    setChecked((prev) => ({ ...prev, [e.target.name]: e.target.checked }));

    // Update query params
    const currentFilters = searchParams.getAll("filter");
    const currentMOV = searchParams.get("mov");

    const updatedFilters = e.target.checked
      ? [...currentFilters, e.target.name]
      : currentFilters.filter((f) => f !== e.target.name);

    if (!currentMOV) {
      setSearchParams({ filter: updatedFilters });
    } else {
      setSearchParams({ filter: updatedFilters, mov: currentMOV });
    }
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
  }, [searchParams]);

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
            label={filter.label}
            control={
              <Checkbox
                name={filter.key}
                checked={checked[filter.key]}
                onChange={handleCheckboxChange}
              />
            }
          />
        ))}
      </FormGroup>
    </Box>
  );
}
