import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Stack
      spacing={4}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <Typography
          variant={isMobile ? "h4" : "h3"}
          component="h2"
          sx={{ fontWeight: 700 }}
        >
          We can't find that page.
        </Typography>

        <Typography variant={isMobile ? "h6" : "h5"} component="p">
          But there's loads more to see!
        </Typography>
      </Stack>

      <Button variant="contained" component={Link} to="/">
        Explore
      </Button>
    </Stack>
  );
}
