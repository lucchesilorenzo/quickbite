import { Paper, Typography } from "@mui/material";

import CustomerRegisterForm from "./CustomerRegisterForm";

export default function CustomerRegisterFormCard() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
        Create account
      </Typography>

      <CustomerRegisterForm />
    </Paper>
  );
}
