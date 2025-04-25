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

const minOrderOptions = [
  { label: "Show all", value: "all" },
  { label: "10,00€ or less", value: "1000" },
  { label: "15,00€ or less", value: "1500" },
];

export default function RestaurantMinimumOrderRadioFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState("all");

  function handleRadioChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);

    // Update query params
    const currentFilters = searchParams.getAll("filter");

    const updatedMOV =
      e.target.value && e.target.value !== "all" ? e.target.value : "";

    if (!updatedMOV) {
      setSearchParams({ filter: currentFilters });
    } else {
      setSearchParams({ filter: currentFilters, mov: updatedMOV });
    }
  }

  useEffect(() => {
    const mov = searchParams.get("mov");

    if (mov) setValue(mov);
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
              label={option.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
