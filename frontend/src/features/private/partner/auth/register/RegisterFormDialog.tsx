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
import { Link } from "react-router-dom";

import PartnerRegisterForm from "./hero/RegisterForm";

type RegisterFormDialogProps = {
  openRegisterFormDialog: boolean;
  setOpenRegisterFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RegisterFormDialog({
  openRegisterFormDialog,
  setOpenRegisterFormDialog,
}: RegisterFormDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openRegisterFormDialog}
      onClose={() => setOpenRegisterFormDialog(false)}
      disableRestoreFocus
      fullWidth={!isMobile}
      fullScreen={isMobile}
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle variant="h6" sx={{ p: 0, fontWeight: 700 }}>
            Sign up
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenRegisterFormDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Grow your orders, your customers and your brand
          </Typography>

          <Box sx={{ my: 2 }}>
            <Typography variant="body2" component="div">
              Already have an account?{" "}
              <Typography
                component={Link}
                to="/partner/auth/login"
                variant="body2"
                color="info"
                sx={{ fontWeight: 500, "&:hover": { textDecoration: "none" } }}
              >
                Log in
              </Typography>
            </Typography>
          </Box>

          <PartnerRegisterForm />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
