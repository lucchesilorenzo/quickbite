import { Link } from "@mui/material";

type ClearFiltersButtonProps = {
  children: React.ReactNode;
  type: "sidebar" | "content";
  onHandleClick: () => void;
};

export default function ClearFiltersButton({
  children,
  type,
  onHandleClick,
}: ClearFiltersButtonProps) {
  return (
    <Link
      component="button"
      color="inherit"
      underline="always"
      sx={{ "&:hover": { textDecoration: type === "sidebar" ? "none" : "" } }}
      onClick={onHandleClick}
    >
      {children}
    </Link>
  );
}
