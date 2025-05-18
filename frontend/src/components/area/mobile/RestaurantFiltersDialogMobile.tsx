import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Dialog, DialogTitle, IconButton, Stack } from "@mui/material";

import RestaurantSort from "../content/search-and-map/RestaurantSort";
import RestaurantHeadingContainer from "../sidebar/RestaurantHeadingContainer";
import RestaurantMinimumOrderRadioFilters from "../sidebar/RestaurantMinimumOrderRadioFilters";
import RestaurantOfferFilters from "../sidebar/RestaurantOfferFilters";
import RestaurantRatingFilter from "../sidebar/RestaurantRatingFilter";
import RestaurantSwitchFilters from "../sidebar/RestaurantSwitchFilters";

export default function RestaurantFiltersDialogMobile() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <IconButton
        size="small"
        color="primary"
        aria-label="menu"
        onClick={() => setOpenDialog(true)}
        sx={{ p: 0 }}
      >
        <FormatListBulletedIcon fontSize="small" />
      </IconButton>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullScreen
        disableRestoreFocus
      >
        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <DialogTitle sx={{ p: 0, fontWeight: "bold" }}>Filters</DialogTitle>

            <IconButton
              color="inherit"
              aria-label="close"
              onClick={() => setOpenDialog(false)}
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
            <RestaurantHeadingContainer
              onCloseDialog={() => setOpenDialog(false)}
            />
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
}
