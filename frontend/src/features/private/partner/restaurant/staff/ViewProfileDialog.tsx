import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { vehicles } from "@/features/private/shared/lib/data/vehicles.data";
import { User } from "@/types/user.types";

type ViewProfileDialogProps = {
  staffMember?: User;
  openViewProfileDialog: boolean;
  setOpenViewProfileDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ViewProfileDialog({
  staffMember,
  openViewProfileDialog,
  setOpenViewProfileDialog,
}: ViewProfileDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const vehicle = vehicles.find(
    (vehicle) => vehicle.value === staffMember?.vehicle_type,
  );
  const VehicleIcon = vehicle?.icon;

  return (
    <Dialog
      open={openViewProfileDialog}
      onClose={() => setOpenViewProfileDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            {staffMember?.first_name} {staffMember?.last_name}
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenViewProfileDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          <Stack spacing={1}>
            <Box>
              <Typography sx={{ fontWeight: 600 }}>Email</Typography>
              <Typography>{staffMember?.email}</Typography>
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 600 }}>Phone number</Typography>
              <Typography>{staffMember?.phone_number}</Typography>
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 600 }}>Address</Typography>
              <Typography>
                {staffMember?.street_address} {staffMember?.building_number},{" "}
                {staffMember?.postcode} {staffMember?.city},{" "}
                {staffMember?.country}
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 600 }}>Vehicle</Typography>

              <Stack direction="row" spacing={1}>
                {VehicleIcon && <VehicleIcon />}
                <Typography>{vehicle?.label}</Typography>
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
