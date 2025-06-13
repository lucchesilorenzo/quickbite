import { useState } from "react";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";

import HeaderDialog from "../common/HeaderDialog";
import CategoryFilters from "./category-carousel/CategoryFilters";
import LocationSearchButton from "./location-search/LocationSearchButton";
import LocationSearchDialog from "./location-search/LocationSearchDialog";
import RestaurantSearchContainerMobile from "./mobile/RestaurantSearchContainerMobile";

export default function AreaHeader() {
  const [cookies] = useCookies(["address"]);
  const [openDialog, setOpenDialog] = useState(false);
  const { search } = useLocation();

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

  return (
    <AppBar position="relative" id="back-to-top" color="inherit" elevation={3}>
      {!search.includes("view_type=map") && (
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
              sx={{ fontWeight: 700, display: { xs: "none", md: "block" } }}
            >
              QuickBite
            </Typography>
          </Stack>

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

          <HeaderDialog />
        </Toolbar>
      )}

      <RestaurantSearchContainerMobile />
      <CategoryFilters />
    </AppBar>
  );
}
