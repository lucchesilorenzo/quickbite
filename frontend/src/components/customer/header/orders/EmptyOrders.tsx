import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";

export default function EmptyOrders() {
  const [searchParams, setSearchParams] = useSearchParams();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  function handleCloseDialog() {
    setSearchParams(
      { ...Object.fromEntries(searchParams), dialog: [] },
      { replace: true },
    );
  }

  return (
    <Stack
      spacing={2}
      sx={{
        ...(isMobile && {
          minHeight: "100vh",
        }),
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 2,
      }}
    >
      <ShoppingBagOutlinedIcon fontSize="large" />

      <Box>
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{ fontWeight: 700 }}
          gutterBottom
        >
          No orders yet
        </Typography>

        <Typography variant="body1">No history available</Typography>
      </Box>

      <Button
        component={Link}
        to="/"
        onClick={handleCloseDialog}
        variant="outlined"
        color="inherit"
        sx={{ border: "1px solid #dbd9d7", fontWeight: 700 }}
      >
        Explore restaurants
      </Button>
    </Stack>
  );
}
