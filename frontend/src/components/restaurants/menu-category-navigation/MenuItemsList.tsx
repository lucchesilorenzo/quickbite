import { Grid } from "@mui/material";

import MenuItemCard from "./MenuItemCard";

import { MenuItem } from "@/types";

type MenuItemsListProps = {
  menuItems: MenuItem[];
};

export default function MenuItemsList({ menuItems }: MenuItemsListProps) {
  return (
    <Grid container spacing={2}>
      {menuItems.map((item) => (
        <Grid size={3}>
          <MenuItemCard key={item.id} menuItem={item} />
        </Grid>
      ))}
    </Grid>
  );
}
