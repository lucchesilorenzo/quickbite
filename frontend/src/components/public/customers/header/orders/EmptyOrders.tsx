import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

type EmptyOrdersProps = {
  setOpenHeaderCustomerDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenOrdersDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EmptyOrders({
  setOpenHeaderCustomerDialog,
  setOpenOrdersDialog,
}: EmptyOrdersProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

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
        onClick={() => {
          setOpenHeaderCustomerDialog(false);
          setOpenOrdersDialog(false);
        }}
        variant="outlined"
        color="inherit"
        sx={{ border: "1px solid #dbd9d7", fontWeight: 700 }}
      >
        Explore restaurants
      </Button>
    </Stack>
  );
}
