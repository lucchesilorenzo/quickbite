import { useEffect } from "react";

import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

type ErrorPageProps = {
  error?: Error | null;
  secondaryMessage?: string;
  showExploreButton?: boolean;
};

export default function ErrorPage({
  error,
  secondaryMessage = "But there's loads more to see!",
  showExploreButton = true,
}: ErrorPageProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  useEffect(() => {
    document.title = `${error?.message || "Page not found"} | QuickBite`;
  }, [error?.message]);

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
          {error?.message || "We can't find that page."}
        </Typography>

        <Typography variant={isMobile ? "h6" : "h5"} component="p">
          {secondaryMessage}
        </Typography>
      </Stack>

      {showExploreButton && (
        <Button variant="contained" component={Link} to="/">
          Explore
        </Button>
      )}
    </Stack>
  );
}
