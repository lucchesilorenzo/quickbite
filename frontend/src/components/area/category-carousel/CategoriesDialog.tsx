import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  List,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";

import CategoriesDialogItem from "./CategoriesDialogItem";

import { Category } from "@/types";

type CategoriesDialogProps = {
  categories: Category[];
};

export default function CategoriesDialog({
  categories,
}: CategoriesDialogProps) {
  const [openDialog, setOpenDialog] = useState(false);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box sx={{ scrollSnapAlign: "center", pl: 2 }}>
      <Button
        variant="outlined"
        color="inherit"
        sx={{
          borderRadius: 2,
          borderColor: "grey.300",
          textTransform: "none",
          textWrap: "nowrap",
        }}
        fullWidth
        onClick={() => setOpenDialog(true)}
      >
        Show more
      </Button>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth={!isMobile}
        fullScreen={isMobile}
      >
        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <DialogTitle sx={{ p: 0, fontWeight: "bold" }}>
              All categories
            </DialogTitle>

            <IconButton
              color="inherit"
              aria-label="close"
              onClick={() => setOpenDialog(false)}
              sx={{ p: 0 }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          <DialogContent sx={{ p: 0 }}>
            <TextField
              id="category-search"
              label="Search for a category"
              variant="standard"
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <List sx={{ display: "flex", alignItems: "center" }}>
              <Grid container>
                {categories.map((category, index) => (
                  <CategoriesDialogItem key={index} category={category} />
                ))}
              </Grid>
            </List>
          </DialogContent>
        </Stack>
      </Dialog>
    </Box>
  );
}
