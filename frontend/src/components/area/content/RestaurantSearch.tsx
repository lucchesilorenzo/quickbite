import { useState } from "react";

import { Autocomplete, TextField } from "@mui/material";

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

  return (
    <Autocomplete
      id="restaurant-search"
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
          placeholder="Looking for places, items or categories?"
          autoComplete="off"
        />
      )}
    />
  );
}
