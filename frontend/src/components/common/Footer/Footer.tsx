import {
  Container,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";

import { useAuth } from "@/contexts/AuthProvider";
import { footerLinks } from "@/lib/data/navigation.data";
import { isCustomer } from "@/lib/utils/auth.utils";

export default function Footer() {
  const { user } = useAuth();

  return (
    <Stack
      id="footer"
      component="footer"
      sx={{ mt: "auto", bgcolor: grey[200] }}
    >
      <Container>
        <List
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
          }}
        >
          {footerLinks
            .filter(
              (link) =>
                !(isCustomer(user) && link.href === "/partner/auth/register"),
            )
            .map((link) => (
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
                  primary={
                    <Typography variant="body2">{link.label}</Typography>
                  }
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
