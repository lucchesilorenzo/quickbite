import {
  Container,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Link, useLocation } from "react-router-dom";

import { footerLinks } from "@/lib/data";

export default function Footer() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const { pathname } = useLocation();

  return (
    <Stack
      id="footer"
      component="footer"
      sx={{
        mt: "auto",
        bgcolor: grey[200],
        pb: pathname.startsWith("/restaurants") && isMobile ? 10 : "",
      }}
    >
      <Container>
        <List
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
          }}
        >
          {footerLinks.map((link) => (
            <ListItem
              disableGutters
              key={link.href}
              component={Link}
              to={link.href}
              sx={{
                width: "fit-content",
                textDecoration: "none",
                color: "inherit",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              <ListItemText
                primary={<Typography variant="body2">{link.label}</Typography>}
              />
            </ListItem>
          ))}
        </List>

        <Typography
          variant="body2"
          sx={{ textAlign: { md: "center" } }}
          gutterBottom
        >
          &copy; {new Date().getFullYear()} QuickBite
        </Typography>
      </Container>
    </Stack>
  );
}
