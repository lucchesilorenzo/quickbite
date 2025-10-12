import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function CheckoutBackground() {
  return (
    <Box
      sx={{
        bgcolor: grey[200],
        width: 1,
        position: "absolute",
        top: 0,
        zIndex: -10,
        height: 300,
      }}
    ></Box>
  );
}
