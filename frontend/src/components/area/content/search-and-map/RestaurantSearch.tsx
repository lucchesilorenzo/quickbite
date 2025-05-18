import { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  InputAdornment,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { grey } from "@mui/material/colors";

const restaurants = [
  "Ristorante Bella Cucina",
  "Trattoria La Dolce Vita",
  "Osteria del Gusto",
  "Pizzeria Da Mario",
  "Ristorante Il Sapore",
  "Locanda Al Mare",
  "Ristorante La Pergola",
  "Ristorante Al Vecchio Mulino",
  "Ristorante L'Arte del Cibo",
  "Trattoria Alla Fontana",
  "Ristorante La Terrazza",
];

export default function RestaurantSearch() {
  const [restaurant, setRestaurant] = useState("");

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Autocomplete
      freeSolo
      fullWidth
      options={restaurants}
      value={restaurant}
      onChange={(_, value) => setRestaurant(value || "")}
      onInputChange={(_, value) => {
        setRestaurant(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          id="restaurant-search"
          size={isMobile ? "small" : "medium"}
          autoComplete="off"
          placeholder="Looking for places, items or categories?"
          sx={{
            bgcolor: isMobile ? grey[100] : "",
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color={isMobile ? "primary" : "inherit"} />
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  );
}
