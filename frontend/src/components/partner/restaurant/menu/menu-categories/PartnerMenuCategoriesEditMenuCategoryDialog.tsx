import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";

import PartnerMenuCategoriesEditMenuCategoryForm from "./PartnerMenuCategoriesEditMenuCategoryForm";

import { PartnerMenu } from "@/types";

type PartnerMenuCategoriesEditMenuCategoryDialogProps = {
  menuCategory: PartnerMenu;
  openEditMenuCategoryDialog: boolean;
  setOpenEditMenuCategoryDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PartnerMenuCategoriesEditMenuCategoryDialog({
  menuCategory,
  openEditMenuCategoryDialog,
  setOpenEditMenuCategoryDialog,
}: PartnerMenuCategoriesEditMenuCategoryDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openEditMenuCategoryDialog}
      onClose={() => setOpenEditMenuCategoryDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Edit menu category
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenEditMenuCategoryDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 1 }}>
          <PartnerMenuCategoriesEditMenuCategoryForm
            menuCategory={menuCategory}
            setOpenEditMenuCategoryDialog={setOpenEditMenuCategoryDialog}
          />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
