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

import { footerLinks } from "@/lib/data";
import env from "@/lib/env";

export default function Footer() {
  return (
    <Stack component="footer" sx={{ mt: "auto", backgroundColor: grey[200] }}>
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
          sx={{
            textAlign: {
              md: "center",
            },
          }}
          gutterBottom
        >
          &copy; {new Date().getFullYear()} {env.VITE_APP_NAME}
        </Typography>
      </Container>
    </Stack>
  );
}
