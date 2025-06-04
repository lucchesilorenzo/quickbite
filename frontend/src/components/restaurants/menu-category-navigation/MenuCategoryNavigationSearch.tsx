import { useMemo, useState } from "react";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";

import MenuItemsList from "./MenuItemsList";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function MenuCategoryNavigationSearch() {
  const { restaurant } = useSingleRestaurant();
  const [searchTerm, setSearchTerm] = useState("");

  const menuItems = restaurant.menu_categories.flatMap((c) => c.menu_items);

  const filteredMenuItems = useMemo(
    () =>
      menuItems.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [searchTerm, menuItems],
  );

  return (
    <Stack spacing={4}>
      <TextField
        id="menu-search"
        autoComplete="off"
        placeholder={`Search in ${restaurant.name}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          mt: 2,
          transition: "background-color 0.2s ease-in-out",
          "&:hover": { bgcolor: grey[100] },
        }}
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {searchTerm && (
                  <IconButton onClick={() => setSearchTerm("")}>
                    <HighlightOffIcon sx={{ color: "#212121" }} />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          },
        }}
      />

      {searchTerm && <MenuItemsList menuItems={filteredMenuItems} />}
    </Stack>
  );
}
