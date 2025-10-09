import { useState } from "react";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import {
  AppBar,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

import CustomerHeaderDialog from "../customer/header/CustomerHeaderDialog";
import CategoryFilters from "./category-carousel/CategoryFilters";
import LocationSearchButton from "./location-search/LocationSearchButton";
import LocationSearchDialog from "./location-search/LocationSearchDialog";
import RestaurantSearchContainerMobile from "./search-bar/mobile/RestaurantSearchContainerMobile";

import HeaderDialog from "@/components/common/HeaderDialog";
import { useAddress } from "@/hooks/contexts/public/useAddress";
import { useAuth } from "@/hooks/contexts/public/useAuth";
import { isCustomer } from "@/lib/utils";

export default function AreaHeader() {
  const { user } = useAuth();
  const { currentAddress } = useAddress();
  const { search } = useLocation();

  const [openLocationSearchDialog, setOpenLocationSearchDialog] =
    useState(false);

  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const showHeader =
    !isMobile || (isMobile && !search.includes("view_type=map"));

  return (
    <AppBar position="relative" id="back-to-top" color="inherit" elevation={3}>
      {showHeader && (
        <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
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
            fullAddress={currentAddress?.display_name}
            setOpenLocationSearchDialog={setOpenLocationSearchDialog}
          />

          {openLocationSearchDialog && (
            <LocationSearchDialog
              openLocationSearchDialog={openLocationSearchDialog}
              setOpenLocationSearchDialog={setOpenLocationSearchDialog}
            />
          )}

          {isCustomer(user) ? <CustomerHeaderDialog /> : <HeaderDialog />}
        </Toolbar>
      )}

      <RestaurantSearchContainerMobile />
      <CategoryFilters />
    </AppBar>
  );
}
