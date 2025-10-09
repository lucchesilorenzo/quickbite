import { Grid } from "@mui/material";

import MenuItemCard from "./MenuItemCard";

import { MenuItem } from "@/types";

type MenuItemsListProps = {
  menuItems: MenuItem[];
};

export default function MenuItemsList({ menuItems }: MenuItemsListProps) {
  return (
    <Grid container spacing={2} sx={{ pb: 4 }}>
      {menuItems.map((item) => (
        <Grid key={item.id} size={{ xs: 6, sm: 4, md: 3 }}>
          <MenuItemCard key={item.id} menuItem={item} />
        </Grid>
      ))}
    </Grid>
  );
}
