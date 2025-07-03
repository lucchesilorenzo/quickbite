import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { Breadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";

export default function TermsAndConditionsBreadcrumb() {
  return (
    <Breadcrumbs
      separator={
        <ChevronRightOutlinedIcon fontSize="small" sx={{ color: "#FFFFFF" }} />
      }
      aria-label="breadcrumb"
      sx={{
        bgcolor: grey[600],
        px: 2,
        borderRadius: 5,
        width: "fit-content",
      }}
    >
      <MuiLink
        component={Link}
        to="/"
        underline="hover"
        sx={{ color: "#FFFFFF", fontWeight: 700 }}
      >
        Home
      </MuiLink>

      <Typography sx={{ color: "#FFFFFF" }}>Terms & Conditions</Typography>
    </Breadcrumbs>
  );
}
