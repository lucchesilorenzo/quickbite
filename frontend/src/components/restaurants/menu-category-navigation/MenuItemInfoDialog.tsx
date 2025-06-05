import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";
import { MenuItem } from "@/types";

type MenuItemInfoDialogProps = {
  menuItem: MenuItem;
  openMenuItemInfoDialog: boolean;
  setOpenMenuItemDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenMenuItemInfoDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MenuItemInfoDialog({
  menuItem,
  openMenuItemInfoDialog,
  setOpenMenuItemDialog,
  setOpenMenuItemInfoDialog,
}: MenuItemInfoDialogProps) {
  const { restaurant } = useSingleRestaurant();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openMenuItemInfoDialog}
      onClose={() => {
        setOpenMenuItemInfoDialog(false);
        setOpenMenuItemDialog(false);
      }}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 4 }}>
        <Stack direction="row" spacing={2}>
          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => {
              setOpenMenuItemInfoDialog(false);
              setOpenMenuItemDialog(true);
            }}
            sx={{ p: 0 }}
          >
            <ArrowBackIosIcon />
          </IconButton>

          <DialogTitle
            component="h3"
            variant="h5"
            sx={{ p: 0, fontWeight: 700 }}
          >
            Item Info
          </DialogTitle>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          <Typography variant="h5" sx={{ p: 0, fontWeight: 700 }} gutterBottom>
            {menuItem.name}
          </Typography>

          <Typography component="div">
            If you have a food allergy or intolerance (or someone you're
            ordering for has), phone the restaurant on{" "}
            <Typography component="span" sx={{ textDecoration: "underline" }}>
              {restaurant.phone_number}
            </Typography>
            . Do not order if you cannot get the allergy information you need.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              setOpenMenuItemInfoDialog(false);
              setOpenMenuItemDialog(true);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
