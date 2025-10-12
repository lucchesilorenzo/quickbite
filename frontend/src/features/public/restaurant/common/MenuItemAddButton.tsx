import PlusIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";

type MenuItemAddButtonProps = {
  type: "from-list" | "from-search";
};

export default function MenuItemAddButton({ type }: MenuItemAddButtonProps) {
  return (
    <IconButton
      sx={{
        bgcolor: "white",
        "&:hover": {
          bgcolor: grey[100],
        },
        border: "1px solid #EDEDEC",
        borderRadius: 5,
        position: "absolute",
        top: type === "from-list" ? -10 : 10,
        right: type === "from-list" ? -10 : 10,
      }}
      aria-label="add"
      size="small"
    >
      <PlusIcon color="primary" fontSize="small" />
    </IconButton>
  );
}
