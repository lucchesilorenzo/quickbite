import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Badge, Dialog, DialogTitle, IconButton, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import RestaurantMinimumOrderRadioFilters from "@public/area/sidebar/RestaurantMinimumOrderRadioFilters";
import RestaurantOfferFilters from "@public/area/sidebar/RestaurantOfferFilters";
import RestaurantRatingFilter from "@public/area/sidebar/RestaurantRatingFilter";
import RestaurantSwitchFilters from "@public/area/sidebar/RestaurantSwitchFilters";
import RestaurantHeadingContainerMobile from "@public/area/sidebar/mobile/RestaurantHeadingContainerMobile";
import { useSearchParams } from "react-router-dom";

import RestaurantSort from "../RestaurantSort";

export default function RestaurantFiltersDialogMobile() {
  const [searchParams] = useSearchParams();
  const [openRestaurantFiltersDialog, setOpenRestaurantFiltersDialog] =
    useState(false);

  const isThereAnyFilter =
    searchParams.getAll("filter").length > 0 ||
    searchParams.getAll("mov").length > 0 ||
    searchParams.getAll("sort_by").length > 0;

  return (
    <>
      <IconButton
        size="small"
        color="primary"
        aria-label="menu"
        onClick={() => setOpenRestaurantFiltersDialog(true)}
        sx={{ p: 0 }}
      >
        <Badge
          variant={isThereAnyFilter ? "dot" : "standard"}
          max={20}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: grey[900],
              color: "#fff",
            },
          }}
        >
          <FormatListBulletedIcon fontSize="small" />
        </Badge>
      </IconButton>

      <Dialog
        open={openRestaurantFiltersDialog}
        onClose={() => setOpenRestaurantFiltersDialog(false)}
        fullScreen
        disableRestoreFocus
      >
        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <DialogTitle sx={{ p: 0, fontWeight: 700 }}>Filters</DialogTitle>

            <IconButton
              color="inherit"
              aria-label="close"
              onClick={() => setOpenRestaurantFiltersDialog(false)}
              sx={{ p: 0 }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack spacing={4}>
            <RestaurantSort />
            <RestaurantSwitchFilters />
            <RestaurantMinimumOrderRadioFilters />
            <RestaurantRatingFilter />
            <RestaurantOfferFilters />
            <RestaurantHeadingContainerMobile
              isThereAnyFilter={isThereAnyFilter}
              onCloseDialog={() => setOpenRestaurantFiltersDialog(false)}
            />
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
}
