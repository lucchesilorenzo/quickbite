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

import { usePartnerRestaurant } from "@/hooks/contexts/private/partner/usePartnerRestaurant";
import { useDeletePartnerRestaurantMenuItem } from "@/hooks/react-query/private/partner/restaurants/menu/items/useDeletePartnerRestaurantMenuItem";
import { MenuItem } from "@/types";

type MenuEditDeleteMenuItemDialogProps = {
  menuItem: MenuItem;
  openDeleteMenuItemDialog: boolean;
  setOpenDeleteMenuItemDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MenuEditDeleteMenuItemDialog({
  menuItem,
  openDeleteMenuItemDialog,
  setOpenDeleteMenuItemDialog,
}: MenuEditDeleteMenuItemDialogProps) {
  const { restaurant } = usePartnerRestaurant();

  const {
    mutateAsync: deletePartnerRestaurantMenuItem,
    isPending: isDeleting,
  } = useDeletePartnerRestaurantMenuItem(restaurant.id, menuItem.id);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openDeleteMenuItemDialog}
      onClose={() => setOpenDeleteMenuItemDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Delete menu item
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenDeleteMenuItemDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          Are you sure you want to delete this menu item?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDeleteMenuItemDialog(false)}>
            Cancel
          </Button>

          <Button
            onClick={async () => await deletePartnerRestaurantMenuItem()}
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
