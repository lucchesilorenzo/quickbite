import { useEffect, useState } from "react";

import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";

import HeadingWithTooltip from "@/components/common/HeadingWithTooltip";
import { useRestaurant } from "@/hooks/contexts/useRestaurant";

export default function RestaurantMinimumOrderRadioFilters() {
  const { originalRestaurants } = useRestaurant();
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState("all");

  const minOrderOptions = [
    {
      label: "Show all",
      value: "all",
      count: originalRestaurants.length,
    },
    {
      label: "10,00 € or less",
      value: "1000",
      count: originalRestaurants.filter((r) => r.min_amount >= 10).length,
    },
    {
      label: "15,00 € or less",
      value: "1500",
      count: originalRestaurants.filter((r) => r.min_amount >= 15).length,
    },
  ];

  function handleRadioChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);

    // Update query params
    const currentFilters = searchParams.getAll("filter");
    const updatedMOV = e.target.value !== "all" ? e.target.value : [];
    const currentSort = searchParams.getAll("sort_by");
    const currentViewType = searchParams.getAll("view_type");

    setSearchParams({
      filter: currentFilters,
      mov: updatedMOV,
      sort_by: currentSort,
      view_type: currentViewType,
    });
  }

  useEffect(() => {
    const mov = searchParams.get("mov");

    setValue(mov || "all");
  }, [searchParams]);

  return (
    <Box>
      <HeadingWithTooltip
        headingText="Minimum order amount"
        tooltipMessage="This is the least amount you need to spend to place an order. Fees are not included."
      />

      <FormControl>
        <RadioGroup
          aria-labelledby="min-order-label"
          name="min-order-value"
          value={value}
          onChange={handleRadioChange}
        >
          {minOrderOptions.map((option) => (
            <FormControlLabel
              control={<Radio />}
              key={option.value}
              value={option.value}
              label={`${option.label} (${option.count})`}
              disabled={option.value !== "all" && !option.count}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
