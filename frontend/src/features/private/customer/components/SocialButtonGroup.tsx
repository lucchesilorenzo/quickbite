import { Box, Button, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import env from "@/lib/env";

export default function SocialButtonGroup() {
  return (
    <Box sx={{ mt: 4 }}>
      <Divider sx={{ my: 2 }}>
        <Typography sx={{ textTransform: "uppercase" }}>Or</Typography>
      </Divider>

      <Button
        component={Link}
        to={`${env.VITE_BASE_URL}/api/auth/google/redirect`}
        variant="outlined"
        color="inherit"
        fullWidth
        sx={{ border: "1px solid #dbd9d7", fontWeight: 700 }}
        startIcon={
          <Box
            component="img"
            src="/google-icon.svg"
            alt="Google Icon"
            width={20}
            height={20}
          />
        }
      >
        Continue with Google
      </Button>
    </Box>
  );
}
