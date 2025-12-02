import { useState } from "react";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Autocomplete, TextField, useMediaQuery } from "@mui/material";
import { grey } from "@mui/material/colors";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { useSearchParams } from "react-router-dom";

import { useCategoryFilters } from "@/contexts/CategoryFiltersProvider";
import { useRestaurants } from "@/contexts/RestaurantsProvider";
import { RestaurantSearchOption } from "@/types/restaurant.types";

export default function RestaurantSearch() {
  const { allCategories } = useCategoryFilters();
  const { restaurantsData, selectedOption, setSelectedOption } =
    useRestaurants();

  const [searchParams, setSearchParams] = useSearchParams();

  const currentSearchTerm = searchParams.get("q") || "";
  const [inputValue, setInputValue] = useState(currentSearchTerm);

  const baseOptions: RestaurantSearchOption[] = [
    ...restaurantsData.map((r) => ({
      id: r.id,
      label: r.name,
      type: "Restaurant",
    })),
    ...allCategories.map((c) => ({
      id: c.id,
      label: c.name,
      type: "Category",
    })),
    ...restaurantsData.flatMap((r) =>
      r.menu_categories.flatMap((c) =>
        c.menu_items.map((i) => ({
          id: i.id,
          label: i.name,
          type: "Item",
        })),
      ),
    ),
  ];

  const uniqueMap = new Map<string, RestaurantSearchOption>();

  baseOptions.forEach((item) => {
    if (!uniqueMap.has(item.label)) {
      uniqueMap.set(item.label, item);
    }
  });

  let uniqueOptions = Array.from(uniqueMap.values());

  if (inputValue.trim() !== "") {
    uniqueOptions = [
      ...uniqueOptions,
      { id: "search", label: inputValue, type: "Search" },
    ];
  }

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  function handleOptionSelect(option: RestaurantSearchOption | string | null) {
    if (option && typeof option === "object") {
      setSelectedOption(option);
      setSearchParams({
        lat: searchParams.getAll("lat"),
        lon: searchParams.getAll("lon"),
        filter: [],
        mov: [],
        sort_by: [],
        view_type: [],
        q: option.label,
      });
    }
  }

  const currentValue =
    selectedOption ||
    (currentSearchTerm
      ? { id: "search", label: currentSearchTerm, type: "Search" }
      : null);

  return (
    <Autocomplete
      freeSolo
      fullWidth
      options={uniqueOptions}
      value={currentValue}
      onChange={(_, newValue) => {
        if (newValue === null) {
          setInputValue("");
          setSelectedOption(null);
          setSearchParams({
            lat: searchParams.getAll("lat"),
            lon: searchParams.getAll("lon"),
            filter: searchParams.getAll("filter"),
            mov: searchParams.getAll("mov"),
            sort_by: searchParams.getAll("sort_by"),
            view_type: searchParams.getAll("view_type"),
            q: [],
          });
        } else {
          handleOptionSelect(newValue);
        }
      }}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.label, inputValue, { insideWords: true });
        const parts = parse(option.label, matches);

        return (
          <li {...props} key={option.id}>
            {option.type !== "Search" ? (
              <div>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{ fontWeight: part.highlight ? 700 : 400 }}
                  >
                    {part.text}
                  </span>
                ))}

                <div style={{ color: grey[600], fontSize: "0.8rem" }}>
                  {option.type}
                </div>
              </div>
            ) : (
              <span style={{ fontWeight: 600 }}>
                See all options for '{inputValue}'
              </span>
            )}
          </li>
        );
      }}
      noOptionsText="No results found"
      clearIcon={<HighlightOffIcon sx={{ color: grey[900] }} />}
      renderInput={(params) => (
        <TextField
          {...params}
          size={isMobile ? "small" : "medium"}
          autoComplete="off"
          placeholder="Looking for places, items or categories?"
          sx={{ bgcolor: isMobile ? grey[100] : "" }}
        />
      )}
    />
  );
}
