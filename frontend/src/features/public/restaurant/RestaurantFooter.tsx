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
import { Link } from "react-router-dom";

import { useMultiCart } from "@/contexts/MultiCartProvider";
import { useRestaurant } from "@/contexts/RestaurantProvider";
import { footerLinks } from "@/lib/constants/navigation";

export default function RestaurantFooter() {
  const { restaurantData } = useRestaurant();
  const { isEmpty } = useMultiCart();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Stack
      id="footer"
      component="footer"
      sx={{
        mt: "auto",
        bgcolor: grey[200],
        pb: isMobile && !isEmpty(restaurantData.restaurant.id) ? 10 : "",
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
