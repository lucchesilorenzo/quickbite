import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      variant="text"
      startIcon={<ArrowBackIcon color="primary" />}
    >
      <Typography
        component="span"
        color="textPrimary"
        sx={{ textTransform: "none", "&:hover": { bgcolor: "none" } }}
      >
        Back
      </Typography>
    </Button>
  );
}
