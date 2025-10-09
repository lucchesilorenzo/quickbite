import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useRestaurant } from "@/hooks/contexts/public/useRestaurant";
import { MenuItem } from "@/types";

type MenuItemInfoDialogProps = {
  type: "from-list" | "from-search";
  menuItem: MenuItem;
  openMenuItemInfoDialog: boolean;
  setOpenMenuItemDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenMenuItemInfoDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MenuItemInfoDialog({
  type,
  menuItem,
  openMenuItemInfoDialog,
  setOpenMenuItemDialog,
  setOpenMenuItemInfoDialog,
}: MenuItemInfoDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { restaurant } = useRestaurant();

  if (type === "from-search") {
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
          {type === "from-search" && (
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
                variant={isMobile ? "h6" : "h5"}
                sx={{ p: 0, fontWeight: 700 }}
              >
                Item Info
              </DialogTitle>
            </Stack>
          )}

          <DialogContent sx={{ p: 0 }}>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{ p: 0, fontWeight: 700 }}
              gutterBottom
            >
              {menuItem.name}
            </Typography>

            <Typography component="div">
              If you have a food allergy or intolerance (or someone you're
              ordering for has), phone the restaurant on{" "}
              <Link
                href={`tel:${restaurant.phone_number}`}
                color="inherit"
                sx={{ textDecoration: "underline" }}
              >
                {restaurant.phone_number}
              </Link>
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

  if (type === "from-list") {
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
          {type === "from-list" && (
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <DialogTitle
                component="h3"
                variant={isMobile ? "h6" : "h5"}
                sx={{ p: 0, fontWeight: 700 }}
              >
                Do you have a food allergy?
              </DialogTitle>

              <IconButton
                color="inherit"
                aria-label="close"
                onClick={() => setOpenMenuItemInfoDialog(false)}
                sx={{ p: 0 }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
          )}

          <DialogContent sx={{ p: 0 }}>
            <Typography component="div">
              If you have a food allergy or intolerance (or someone you're
              ordering for has), phone the restaurant on{" "}
              <Link
                href={`tel:${restaurant.phone_number}`}
                color="inherit"
                sx={{ textDecoration: "underline" }}
              >
                {restaurant.phone_number}
              </Link>
              . Do not order if you cannot get the allergy information you need.
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setOpenMenuItemInfoDialog(false)}
            >
              Close
            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
    );
  }
}
