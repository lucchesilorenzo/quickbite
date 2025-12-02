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
import { grey } from "@mui/material/colors";

import CategoryDialogItem from "./CategoryDialogItem";

import { useCategoryFilters } from "@/contexts/CategoryFiltersProvider";
import { CategoryWithSelected } from "@/types/category.types";

type CategoryDialogProps = {
  categories: CategoryWithSelected[];
};

export default function CategoryDialog({ categories }: CategoryDialogProps) {
  const { openCategoriesDialog, setOpenCategoriesDialog } =
    useCategoryFilters();

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
    <Box>
      <Button
        onClick={() => setOpenCategoriesDialog(true)}
        variant="outlined"
        color="inherit"
        fullWidth
        sx={{
          width: 120,
          height: 80,
          borderRadius: 2,
          borderColor: grey[300],
          textTransform: "none",
          textWrap: "nowrap",
          fontWeight: 700,
        }}
      >
        Show more
      </Button>

      <Dialog
        open={openCategoriesDialog}
        onClose={() => setOpenCategoriesDialog(false)}
        fullWidth={!isMobile}
        fullScreen={isMobile}
        disableRestoreFocus
      >
        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

            <List>
              <Grid container>
                {filteredCategories.map((category) => (
                  <CategoryDialogItem key={category.id} category={category} />
                ))}
              </Grid>
            </List>
          </DialogContent>
        </Stack>
      </Dialog>
    </Box>
  );
}
