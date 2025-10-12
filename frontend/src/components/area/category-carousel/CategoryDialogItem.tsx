import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import { useCategoryFilters } from "@/contexts/public/CategoryFiltersProvider";
import { useRestaurants } from "@/contexts/public/RestaurantsProvider";
import { CategoryWithSelected } from "@/types";

type CategoryDialogItemProps = {
  category: CategoryWithSelected;
};

export default function CategoryDialogItem({
  category,
}: CategoryDialogItemProps) {
  const { handleStatusChange } = useCategoryFilters();
  const { restaurantsData } = useRestaurants();

  const restaurantsPerCategory = restaurantsData.reduce((acc, r) => {
    return acc + r.categories.filter((c) => c.name === category.name).length;
  }, 0);

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <ListItem>
        <ListItemButton
          onClick={() => handleStatusChange(category)}
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
                {category.name} ({restaurantsPerCategory})
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
    </Grid>
  );
}
