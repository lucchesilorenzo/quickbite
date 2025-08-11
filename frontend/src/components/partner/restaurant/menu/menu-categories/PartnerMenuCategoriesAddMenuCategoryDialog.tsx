import { useState } from "react";

import PlusIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";

import PartnerMenuCategoriesAddMenuCategoryForm from "./PartnerMenuCategoriesAddMenuCategoryForm";

export default function PartnerMenuCategoriesAddMenuCategoryDialog() {
  const [openAddMenuCategoryDialog, setOpenAddMenuCategoryDialog] =
    useState(false);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpenAddMenuCategoryDialog(true)}
        startIcon={<PlusIcon />}
      >
        Add menu category
      </Button>

      <Dialog
        open={openAddMenuCategoryDialog}
        onClose={() => setOpenAddMenuCategoryDialog(false)}
        fullWidth={!isMobile}
        fullScreen={isMobile}
        disableRestoreFocus
      >
        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
              Add menu category
            </DialogTitle>

            <IconButton
              color="inherit"
              aria-label="close"
              onClick={() => setOpenAddMenuCategoryDialog(false)}
              sx={{ p: 0 }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          <DialogContent sx={{ p: 1 }}>
            <PartnerMenuCategoriesAddMenuCategoryForm
              setOpenAddMenuCategoryDialog={setOpenAddMenuCategoryDialog}
            />
          </DialogContent>
        </Stack>
      </Dialog>
    </>
  );
}
