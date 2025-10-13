import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import LoginForm from "./LoginForm";

export default function LoginFormContainer() {
  return (
    <Container
      maxWidth="xs"
      disableGutters
      sx={{
        justifyContent: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Log in
      </Typography>

      <LoginForm />

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Don't have an account yet?
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Button
          component={Link}
          to="/partner/auth/register"
          variant="outlined"
          color="inherit"
          fullWidth
          sx={{ border: "1px solid #dbd9d7", fontWeight: 700 }}
        >
          Create an account
        </Button>
      </Box>
    </Container>
  );
}
