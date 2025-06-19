import { useMemo } from "react";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchIcon from "@mui/icons-material/Search";
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import MenuItemsEmpty from "./MenuItemsEmpty";
import MenuItemsList from "./MenuItemsList";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function MenuCategoryNavigationSearch() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { restaurant, searchTerm, setSearchTerm } = useSingleRestaurant();

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
        autoComplete="off"
        size={isMobile ? "small" : "medium"}
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
                  <IconButton
                    onClick={() => setSearchTerm("")}
                    size={isMobile ? "small" : "medium"}
                  >
                    <HighlightOffIcon sx={{ color: grey[900] }} />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          },
        }}
      />

      {searchTerm && filteredMenuItems.length ? (
        <MenuItemsList menuItems={filteredMenuItems} />
      ) : (
        searchTerm && <MenuItemsEmpty setSearchTerm={setSearchTerm} />
      )}
    </Stack>
  );
}
