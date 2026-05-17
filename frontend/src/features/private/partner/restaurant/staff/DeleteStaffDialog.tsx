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

import { useDeleteStaffMember } from "../../hooks/restaurants/staff/useDeleteStaffMember";

import { User } from "@/types/user.types";

type DeleteStaffDialogProps = {
  staffId: string | null;
  staff?: User[];
  openDeleteStaffDialog: boolean;
  setOpenDeleteStaffDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeleteStaffDialog({
  staffId,
  staff,
  openDeleteStaffDialog,
  setOpenDeleteStaffDialog,
}: DeleteStaffDialogProps) {
  const { restaurantData } = useRestaurant();

  const { mutate: deleteJobPost, isPending: isDeleting } = useDeleteStaffMember(
    {
      restaurantId: restaurantData.restaurant.id,
      staffId,
      setOpenDeleteStaffDialog,
    },
  );

  const { first_name, last_name } = staff?.find((s) => s.id === staffId) || {};

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  function handleDeleteJobPost() {
    deleteJobPost();
  }

  return (
    <Dialog
      open={openDeleteStaffDialog}
      onClose={() => setOpenDeleteStaffDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Terminate collaboration
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenDeleteStaffDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          Are you sure you want to terminate collaboration with {first_name}{" "}
          {last_name}?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDeleteStaffDialog(false)}>
            Cancel
          </Button>

          <Button
            onClick={handleDeleteJobPost}
            loading={isDeleting}
            loadingIndicator="Deleting..."
          >
            Confirm
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
