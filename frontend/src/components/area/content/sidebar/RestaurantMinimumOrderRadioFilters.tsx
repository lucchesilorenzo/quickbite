import { useEffect, useState } from "react";

import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";

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
    <FormControl>
      <RadioGroup
        aria-labelledby="min-order-label"
        name="min-order-value"
        value={value}
        onChange={handleRadioChange}
      >
        {minOrderOptions.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
