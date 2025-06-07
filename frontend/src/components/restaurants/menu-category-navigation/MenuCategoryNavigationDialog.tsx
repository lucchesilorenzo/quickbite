import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

type MenuCategoryNavigationDialogProps = {
  menuCategories: string[];
  openMenuCategoryNavigationDialog: boolean;
  setOpenMenuCategoryNavigationDialog: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  onHandleClick: (menuCategory: string) => void;
};

export default function MenuCategoryNavigationDialog({
  menuCategories,
  openMenuCategoryNavigationDialog,
  setOpenMenuCategoryNavigationDialog,
  onHandleClick,
}: MenuCategoryNavigationDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openMenuCategoryNavigationDialog}
      onClose={() => setOpenMenuCategoryNavigationDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2}>
        <Stack direction="row" sx={{ justifyContent: "space-between", p: 2 }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>Categories</DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenMenuCategoryNavigationDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          <List disablePadding>
            {menuCategories.map((category, index) => (
              <>
                <ListItem key={category} disableGutters disablePadding>
                  <ListItemButton
                    onClick={() => {
                      onHandleClick(category);
                      setOpenMenuCategoryNavigationDialog(false);
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="body1" sx={{ fontWeight: 700 }}>
                          {category}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>

                {index !== menuCategories.length - 1 && <Divider />}
              </>
            ))}
          </List>
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
