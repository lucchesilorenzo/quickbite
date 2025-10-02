import { useState } from "react";

import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import MenuItemQuantityInCartBadge from "../../common/menu-category-navigation/MenuItemQuantityInCartBadge";
import MenuItemAddButton from "../common/MenuItemAddButton";
import MenuItemDialog from "../menu-category-navigation/MenuItemDialog";
import MenuItemInfoDialog from "../menu-category-navigation/MenuItemInfoDialog";

import { useMultiCart } from "@/hooks/contexts/public/useMultiCart";
import { useSingleRestaurant } from "@/hooks/contexts/public/useSingleRestaurant";
import env from "@/lib/env";
import { formatCurrency, truncateWords } from "@/lib/utils";
import type { MenuItem } from "@/types";

type MenuItemRowProps = {
  menuItem: MenuItem;
  isLast: boolean;
};

export default function MenuItemRow({ menuItem, isLast }: MenuItemRowProps) {
  const { restaurant } = useSingleRestaurant();
  const { inCart } = useMultiCart();

  const [openMenuItemDialog, setOpenMenuItemDialog] = useState(false);
  const [openMenuItemInfoDialog, setOpenMenuItemInfoDialog] = useState(false);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <>
      <Card
        variant={isMobile ? "outlined" : "elevation"}
        elevation={!menuItem.is_available ? 0 : 3}
        sx={{ borderBottom: isMobile && isLast ? "none" : "" }}
      >
        <Box
          role="button"
          sx={{
            p: 2,
            bgcolor: !menuItem.is_available ? grey[100] : "",
            "&:hover": {
              bgcolor: grey[100],
              cursor: menuItem.is_available ? "pointer" : "default",
            },
          }}
          onClick={() => {
            if (!menuItem.is_available) return;

            setOpenMenuItemDialog(true);
            setOpenMenuItemInfoDialog(false);
          }}
        >
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Box sx={{ flex: 1, pr: 1 }}>
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <Typography
                  component="h3"
                  variant={isMobile ? "body1" : "h6"}
                  sx={{
                    fontWeight: 700,
                    color: !menuItem.is_available ? grey[500] : "",
                  }}
                >
                  {menuItem.name}
                </Typography>

                <Box>
                  <IconButton
                    disabled={!menuItem.is_available}
                    color="inherit"
                    sx={{ "&:hover": { bgcolor: "transparent" } }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuItemInfoDialog(true);
                      setOpenMenuItemDialog(false);
                    }}
                    size={isMobile ? "small" : "medium"}
                  >
                    <InfoOutlineIcon fontSize={isMobile ? "small" : "medium"} />
                  </IconButton>
                </Box>
              </Stack>

              <CardContent sx={{ p: 0 }}>
                <Typography
                  component="h4"
                  variant={isMobile ? "body2" : "body1"}
                  sx={{
                    fontWeight: menuItem.is_available ? 700 : "",
                    color: !menuItem.is_available ? grey[500] : "",
                  }}
                  gutterBottom
                >
                  {menuItem.is_available
                    ? formatCurrency(menuItem.price)
                    : "Unavailable"}
                </Typography>

                {menuItem.description && (
                  <Typography
                    component="div"
                    variant="body2"
                    color={!menuItem.is_available ? "textDisabled" : ""}
                  >
                    {truncateWords(menuItem.description, 20)}
                  </Typography>
                )}
              </CardContent>
            </Box>

            <Box sx={{ flexShrink: 0, position: "relative" }}>
              {menuItem.image ? (
                <CardMedia
                  component="img"
                  sx={{
                    height: 100,
                    width: 150,
                    border: "1px solid #EDEDEC",
                    borderRadius: 2,
                  }}
                  image={`${env.VITE_BASE_URL}${menuItem.image}`}
                  alt={menuItem.name}
                  title={menuItem.name}
                />
              ) : (
                <Box sx={{ height: 100, width: 150 }}></Box>
              )}

              {menuItem.is_available && inCart(restaurant.id, menuItem.id) ? (
                <MenuItemQuantityInCartBadge
                  type="from-list"
                  menuItem={menuItem}
                />
              ) : (
                menuItem.is_available && <MenuItemAddButton type="from-list" />
              )}
            </Box>
          </Stack>
        </Box>
      </Card>

      <MenuItemDialog
        menuItem={menuItem}
        openMenuItemDialog={openMenuItemDialog}
        setOpenMenuItemDialog={setOpenMenuItemDialog}
      />

      <MenuItemInfoDialog
        type="from-list"
        menuItem={menuItem}
        openMenuItemInfoDialog={openMenuItemInfoDialog}
        setOpenMenuItemDialog={setOpenMenuItemDialog}
        setOpenMenuItemInfoDialog={setOpenMenuItemInfoDialog}
      />
    </>
  );
}
