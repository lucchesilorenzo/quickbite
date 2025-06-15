import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { AppBar, IconButton, Stack, Toolbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import HeaderDialog from "@/components/common/HeaderDialog";

export default function RestaurantHeader() {
  const navigate = useNavigate();

  return (
    <AppBar position="relative" id="back-to-top" color="inherit" elevation={3}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Stack
          direction="row"
          spacing={1}
          component={Link}
          to="/"
          sx={{ alignItems: "center", textDecoration: "none" }}
        >
          <IconButton onClick={() => navigate(-1)}>
            <KeyboardArrowLeftIcon color="primary" />
          </IconButton>

          <RestaurantMenuIcon color="primary" />
        </Stack>

        <HeaderDialog />
      </Toolbar>
    </AppBar>
  );
}
