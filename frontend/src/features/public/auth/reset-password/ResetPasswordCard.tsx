import { Paper, Typography } from "@mui/material";

import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordCard() {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
        Reset password
      </Typography>

      <ResetPasswordForm />
    </Paper>
  );
}
