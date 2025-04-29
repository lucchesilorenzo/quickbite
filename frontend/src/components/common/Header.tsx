import { useState } from "react";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useCookies } from "react-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";

import LocationSearchButton from "../area/location-search/LocationSearchButton";
import HeaderDialog from "./HeaderDialog";

import CategoriesFilter from "@/components/area/category-carousel/CategoryFilters";
import LocationSearchDialog from "@/components/area/location-search/LocationSearchDialog";
import { routes } from "@/lib/data";

export default function Header() {
  const [cookies] = useCookies(["address"]);
  const [openDialog, setOpenDialog] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Check if the address cookie has all the required fields
  const hasFullAddressFields =
    (cookies.address?.address?.name || cookies.address?.address?.road) &&
    cookies.address?.address?.house_number &&
    cookies.address?.address?.postcode &&
    cookies.address?.address?.city;

  const fullAddress = hasFullAddressFields
    ? `${cookies.address.address.name || cookies.address.address.road}, ${cookies.address.address.house_number}, ${cookies.address.address.postcode} ${cookies.address.address.city}`
    : cookies.address?.display_name;

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

          {pathname.startsWith("/area") && (
            <>
              <LocationSearchButton
                fullAddress={fullAddress}
                setOpenDialog={setOpenDialog}
              />

              {openDialog && (
                <LocationSearchDialog
                  openDialog={openDialog}
                  onCloseDialog={() => setOpenDialog(false)}
                />
              )}
            </>
          )}

          <HeaderDialog />
        </Toolbar>

        {pathname.startsWith("/area") && <CategoriesFilter />}
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
