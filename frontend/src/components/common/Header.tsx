import { useState } from "react";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { CircularProgress, IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useCookies } from "react-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";

import HeaderDialog from "./HeaderDialog";
import LocationSearchDialog from "./LocationSearchDialog";

import { routes } from "@/lib/data";

export default function Header() {
  const [cookie] = useCookies(["address"]);
  const [openDialog, setOpenDialog] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Check if the address cookie has all the required fields
  const hasFullAddressFields =
    (cookie.address?.address?.name || cookie.address?.address?.road) &&
    cookie.address?.address?.house_number &&
    cookie.address?.address?.postcode &&
    cookie.address?.address?.city;

  const fullAddress = hasFullAddressFields
    ? `${cookie.address.address.name || cookie.address.address.road}, ${cookie.address.address.house_number}, ${cookie.address.address.postcode} ${cookie.address.address.city}`
    : cookie.address.display_name;

  if (pathname !== "/") {
    return (
      <AppBar
        position="relative"
        id="back-to-top"
        color="inherit"
        elevation={3}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack
            direction="row"
            spacing={1}
            component={Link}
            to="/"
            sx={{
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <IconButton onClick={() => navigate(-1)}>
              <KeyboardArrowLeftIcon color="primary" />
            </IconButton>

            <RestaurantMenuIcon color="primary" />

            <Typography
              variant="h6"
              component="span"
              color="primary"
              sx={{
                fontWeight: "700",
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              QuickBite
            </Typography>
          </Stack>

          {pathname.startsWith("/area") &&
            (!fullAddress ? (
              <CircularProgress size={20} />
            ) : (
              <>
                <Button
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  color="inherit"
                  onClick={() => setOpenDialog(true)}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      maxWidth: {
                        xs: 150,
                        md: "100%",
                      },
                    }}
                  >
                    <LocationOnIcon color="primary" fontSize="small" />

                    <Typography
                      variant="body2"
                      component="span"
                      color="textPrimary"
                      sx={{ fontWeight: "700" }}
                      noWrap
                    >
                      {fullAddress}
                    </Typography>
                  </Stack>
                </Button>

                {openDialog && (
                  <LocationSearchDialog
                    openDialog={openDialog}
                    onCloseDialog={() => setOpenDialog(false)}
                  />
                )}
              </>
            ))}

          <HeaderDialog />
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position="relative" id="back-to-top" color="inherit" elevation={3}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Stack
          direction="row"
          spacing={1}
          component={Link}
          to="/"
          sx={{
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <RestaurantMenuIcon color="primary" />

          <Typography
            variant="h6"
            component="span"
            color="primary"
            sx={{ fontWeight: "700" }}
          >
            QuickBite
          </Typography>
        </Stack>

        <Stack direction="row" spacing={{ md: 4 }}>
          {routes.map((route) => (
            <Button
              key={route.href}
              color="inherit"
              startIcon={<route.icon />}
              component={Link}
              to={route.href}
              sx={{
                ...(route.href !== "/auth/login" && {
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                }),
              }}
            >
              {route.label}
            </Button>
          ))}

          <HeaderDialog />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
