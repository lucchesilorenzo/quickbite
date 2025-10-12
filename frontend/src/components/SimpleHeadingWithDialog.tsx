import { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";

import ClearFiltersButton from "@/features/public/area/common/ClearFiltersButton";

type SimpleHeadingWithDialogProps = {
  headingText: string;
  title: string;
  content: string;
  actionText: string;
};

export default function SimpleHeadingWithDialog({
  headingText,
  title,
  content,
  actionText,
}: SimpleHeadingWithDialogProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openSimpleHeadingDialog, setSimpleHeadingDialog] = useState(false);
  const [isThereAnyFilter, setIsThereAnyFilter] = useState(false);

  function handleClearFilters() {
    setSearchParams({
      lat: searchParams.getAll("lat"),
      lon: searchParams.getAll("lon"),
      filter: [],
      mov: [],
      sort_by: [],
      view_type: searchParams.getAll("view_type"),
      q: [],
    });

    setIsThereAnyFilter(false);
  }

  useEffect(() => {
    const hasFilters =
      searchParams.getAll("filter").length > 0 ||
      searchParams.getAll("mov").length > 0 ||
      searchParams.getAll("sort_by").length > 0 ||
      searchParams.getAll("q").length > 0;

    setIsThereAnyFilter(hasFilters);
  }, [searchParams]);

  return (
    <Box>
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Typography component="h1" variant="h6" sx={{ fontWeight: "700" }}>
          {headingText}
        </Typography>

        <IconButton
          color="inherit"
          onClick={() => setSimpleHeadingDialog(true)}
        >
          <InfoOutlineIcon />
        </IconButton>
      </Stack>

      {isThereAnyFilter && (
        <ClearFiltersButton type="content" onHandleClick={handleClearFilters}>
          Clear all filters
        </ClearFiltersButton>
      )}

      <Dialog
        open={openSimpleHeadingDialog}
        onClose={() => setSimpleHeadingDialog(false)}
        disableRestoreFocus
      >
        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <DialogTitle sx={{ p: 0, fontWeight: 700 }}>{title}</DialogTitle>

            <IconButton
              color="inherit"
              aria-label="close"
              onClick={() => setSimpleHeadingDialog(false)}
              sx={{ p: 0 }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          <DialogContent sx={{ p: 0 }}>{content}</DialogContent>

          <DialogActions>
            <Button variant="contained" component={Link} to="/how-we-rank">
              {actionText}
            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </Box>
  );
}
