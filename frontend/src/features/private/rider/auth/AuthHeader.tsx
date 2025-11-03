import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { Button, IconButton, useMediaQuery } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function AuthHeader() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <AppBar position="relative" color="inherit" elevation={3}>
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

          <Typography
            variant="h6"
            component="span"
            color="primary"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            QuickBite
          </Typography>
        </Stack>

        {pathname === "/rider/auth/register" && (
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Button
              component={Link}
              to="/rider/auth/login"
              variant="contained"
              size={isMobile ? "small" : "medium"}
              color="success"
              startIcon={<PersonOutlinedIcon color="primary" />}
              sx={{
                bgcolor: grey[100],
                color: "black",
                "&:hover": { color: "white", bgcolor: "#212121" },
                transition: "0.3s ease-in-out",
              }}
            >
              Log in
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}
