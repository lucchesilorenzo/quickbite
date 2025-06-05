import PlusIcon from "@mui/icons-material/Add";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import MenuItemDialog from "./MenuItemDialog";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";
import env from "@/lib/env";
import { formatCurrency } from "@/lib/utils";
import { MenuItem } from "@/types";

type MenuItemCardProps = {
  menuItem: MenuItem;
};

export default function MenuItemCard({ menuItem }: MenuItemCardProps) {
  const { setOpenMenuItemDialog } = useSingleRestaurant();

  return (
    <>
      <Card elevation={3}>
        <CardActionArea
          disabled={!menuItem.is_available}
          sx={{
            p: 2,
            bgcolor: !menuItem.is_available ? grey[100] : "",
            "&:hover": { bgcolor: grey[100] },
          }}
          onClick={() => setOpenMenuItemDialog(true)}
        >
          <Box sx={{ py: 2 }}>
            {menuItem.image ? (
              <CardMedia
                component="img"
                sx={{ height: 100, position: "relative" }}
                image={`${env.VITE_BASE_URL}${menuItem.image}`}
                alt={menuItem.name}
                title={menuItem.name}
              />
            ) : (
              <Box sx={{ height: 100 }}></Box>
            )}

            {menuItem.is_available && (
              <IconButton
                sx={{
                  bgcolor: "white",
                  "&:hover": {
                    bgcolor: grey[100],
                  },
                  border: "1px solid #EDEDEC",
                  borderRadius: 5,
                  position: "absolute",
                  top: 8,
                  right: 8,
                }}
                aria-label="add"
              >
                <PlusIcon color="primary" />
              </IconButton>
            )}
          </Box>

          <CardContent sx={{ p: 0 }}>
            <Typography
              component="h3"
              variant="h6"
              sx={{
                fontWeight: 700,
                mt: 4,
                color: !menuItem.is_available ? grey[500] : "",
              }}
            >
              {menuItem.name}
            </Typography>

            <Box sx={{ my: 4 }}></Box>

            <Typography
              component="h4"
              variant="body1"
              sx={{
                fontWeight: 500,
                color: !menuItem.is_available ? grey[500] : "",
              }}
            >
              {menuItem.is_available
                ? formatCurrency(menuItem.price)
                : "Unavailable"}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <MenuItemDialog menuItem={menuItem} />
    </>
  );
}
