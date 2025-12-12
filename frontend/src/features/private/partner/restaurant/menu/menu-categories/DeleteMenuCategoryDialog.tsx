import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useDeleteMenuCategory } from "@partner/hooks/restaurants/menu/categories/useDeleteMenuCategory";
import { PartnerMenu } from "@partner/types/menu/menu.types";

type DeleteMenuCategoryDialogProps = {
  menuCategory: PartnerMenu;
  openDeleteMenuCategoryDialog: boolean;
  setOpenDeleteMenuCategoryDialog: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export default function DeleteMenuCategoryDialog({
  menuCategory,
  openDeleteMenuCategoryDialog,
  setOpenDeleteMenuCategoryDialog,
}: DeleteMenuCategoryDialogProps) {
  const { restaurantData } = useRestaurant();

  const { mutate: deleteRestaurantMenuCategory, isPending: isDeleting } =
    useDeleteMenuCategory({
      restaurantId: restaurantData.restaurant.id,
      menuCategoryId: menuCategory.id,
    });

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openDeleteMenuCategoryDialog}
      onClose={() => setOpenDeleteMenuCategoryDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Delete menu category
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenDeleteMenuCategoryDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          Are you sure you want to delete this menu category?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDeleteMenuCategoryDialog(false)}>
            Cancel
          </Button>

          <Button
            onClick={() => deleteRestaurantMenuCategory()}
            disabled={isDeleting}
            loading={isDeleting}
            loadingIndicator="Deleting..."
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
