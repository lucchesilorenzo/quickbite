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
  const { movCounts } = useRestaurant();

  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState("all");

  const minOrderOptions = [
    {
      label: "Show all",
      value: "all",
      count: movCounts.all,
    },
    {
      label: "10,00 € or less",
      value: "1000",
      count: movCounts[1000],
    },
    {
      label: "15,00 € or less",
      value: "1500",
      count: movCounts[1500],
    },
  ];

  function handleRadioChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);

    // Update query params
    const updatedMOV = e.target.value !== "all" ? e.target.value : [];

    setSearchParams({
      lat: searchParams.getAll("lat"),
      lon: searchParams.getAll("lon"),
      filter: searchParams.getAll("filter"),
      mov: updatedMOV,
      sort_by: searchParams.getAll("sort_by"),
      view_type: searchParams.getAll("view_type"),
      q: searchParams.getAll("q"),
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
