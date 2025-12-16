import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
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
        p: 2,
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
          to="/rider/auth/register"
          variant="contained"
          color="inherit"
          fullWidth
          sx={{
            "&:hover": { bgcolor: grey[300], transition: "0.3s ease-in-out" },
            fontWeight: 700,
          }}
        >
          Create an account
        </Button>
      </Box>
    </Container>
  );
}
