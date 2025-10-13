import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Typography } from "@mui/material";

type FormHelperTextErrorProps = {
  message: string;
};

export function FormHelperTextError({ message }: FormHelperTextErrorProps) {
  return (
    <Typography
      component="span"
      variant="body2"
      color="error"
      sx={{ display: "flex", alignItems: "center", gap: 1 }}
    >
      <ErrorOutlineIcon fontSize="small" />
      {message}
    </Typography>
  );
}
