import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import { Category } from "@/types";

type CategoriesDialogItem = {
  category: Category;
};

export default function CategoriesDialogItem({
  category,
}: CategoriesDialogItem) {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <ListItem>
        <ListItemButton
          selected={category.selected}
          sx={{
            "&:hover": {
              borderRadius: 2,
            },
            "&.Mui-selected": {
              borderRadius: 2,
              bgcolor: "#262626",
              color: "white",
            },
            "&.Mui-selected:hover": {
              bgcolor: "#333333",
            },
          }}
        >
          <ListItemText
            primary={
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {category.name} (1)
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
    </Grid>
  );
}
