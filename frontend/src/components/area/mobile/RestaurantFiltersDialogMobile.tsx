import { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Badge, Dialog, DialogTitle, IconButton, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import RestaurantSort from "../content/search-and-map/RestaurantSort";
import RestaurantMinimumOrderRadioFilters from "../sidebar/RestaurantMinimumOrderRadioFilters";
import RestaurantOfferFilters from "../sidebar/RestaurantOfferFilters";
import RestaurantRatingFilter from "../sidebar/RestaurantRatingFilter";
import RestaurantSwitchFilters from "../sidebar/RestaurantSwitchFilters";
import RestaurantHeadingContainerMobile from "./RestaurantHeadingContainerMobile";

export default function RestaurantFiltersDialogMobile() {
  const [searchParams] = useSearchParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [isThereAnyFilter, setIsThereAnyFilter] = useState(false);

  useEffect(() => {
    const hasFilters =
      searchParams.getAll("filter").length > 0 ||
      searchParams.getAll("mov").length > 0 ||
      searchParams.getAll("sort_by").length > 0;

    setIsThereAnyFilter(hasFilters);
  }, [searchParams]);

  return (
    <>
      <IconButton
        size="small"
        color="primary"
        aria-label="menu"
        onClick={() => setOpenDialog(true)}
        sx={{ p: 0 }}
      >
        <Badge
          variant={isThereAnyFilter ? "dot" : "standard"}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "#000",
              color: "#fff",
            },
          }}
        >
          <FormatListBulletedIcon fontSize="small" />
        </Badge>
      </IconButton>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullScreen
        disableRestoreFocus
      >
        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <DialogTitle sx={{ p: 0, fontWeight: 700 }}>Filters</DialogTitle>

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
            <RestaurantHeadingContainerMobile
              isThereAnyFilter={isThereAnyFilter}
              onCloseDialog={() => setOpenDialog(false)}
              setIsThereAnyFilter={setIsThereAnyFilter}
            />
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
}
