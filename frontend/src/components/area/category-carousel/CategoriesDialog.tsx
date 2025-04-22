import { useMemo, useState } from "react";

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

import { useCategoriesFilter } from "@/hooks/contexts/useCategoriesFilter";
import { Category } from "@/types";

type CategoriesDialogProps = {
  categories: Category[];
};

export default function CategoriesDialog({
  categories,
}: CategoriesDialogProps) {
  const { openCategoriesDialog, setOpenCategoriesDialog } =
    useCategoriesFilter();
  const [searchTerm, setSearchTerm] = useState("");

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const filteredCategories = useMemo(
    () =>
      categories.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [categories, searchTerm],
  );

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
        onClick={() => setOpenCategoriesDialog(true)}
      >
        Show more
      </Button>

      <Dialog
        open={openCategoriesDialog}
        onClose={() => setOpenCategoriesDialog(false)}
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
              onClick={() => setOpenCategoriesDialog(false)}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <List>
              <Grid container>
                {filteredCategories.map((category, index) => (
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
