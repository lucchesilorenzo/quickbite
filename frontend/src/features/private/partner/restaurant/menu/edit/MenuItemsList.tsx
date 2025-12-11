import { useEffect, useMemo, useState } from "react";

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { Box, Stack, Typography, debounce } from "@mui/material";
import { useMenu } from "@partner/contexts/MenuProvider";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useUpdateMenuItemsOrder } from "@partner/hooks/restaurants/menu/items/useUpdateMenuItemsOrder";
import { useGetMenu } from "@partner/hooks/restaurants/menu/useGetMenu";
import { menuDefaults } from "@partner/lib/query-defaults";

import MenuItem from "./MenuItem";

import CustomPagination from "@/components/common/CustomPagination";
import FullPageErrorMessage from "@/components/common/FullPageErrorMessage";
import Spinner from "@/components/common/Spinner";

export default function MenuItemsList() {
  const { restaurantData } = useRestaurant();
  const { selectedMenuCategoryId } = useMenu();

  const [page, setPage] = useState(1);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );

  const {
    data: menuData = { success: false, message: "", menu: menuDefaults },
    isLoading: isLoadingMenu,
    error: menuError,
  } = useGetMenu({ restaurantId: restaurantData.restaurant.id, page });

  const { mutateAsync: updateMenuItemsOrder } = useUpdateMenuItemsOrder({
    restaurantId: restaurantData.restaurant.id,
  });

  const debounceUpdateRestaurantMenuItemsOrder = useMemo(
    () => debounce(updateMenuItemsOrder, 500),
    [updateMenuItemsOrder],
  );

  const selectedMenuCategory = useMemo(
    () => menuData.menu.find((c) => c.id === selectedMenuCategoryId),
    [menuData.menu, selectedMenuCategoryId],
  );

  const menuItems = useMemo(
    () => selectedMenuCategory?.menu_items.data || [],
    [selectedMenuCategory],
  );

  const [items, setItems] = useState(menuItems);

  useEffect(() => {
    setItems(menuItems);
  }, [menuItems]);

  if (isLoadingMenu) {
    return <Spinner />;
  }

  if (menuError) {
    return <FullPageErrorMessage message={menuError.message} />;
  }

  async function handleMenuItemSort({ active, over }: DragEndEvent) {
    if (active.id === over?.id) return;

    setItems((prev) => {
      const from = prev.findIndex((i) => i.id === active.id);
      const to = prev.findIndex((i) => i.id === over?.id);

      const newItems = arrayMove(prev, from, to);
      const updatedItems = newItems.map((item, index) => ({
        ...item,
        order: index,
      }));

      debounceUpdateRestaurantMenuItemsOrder(updatedItems);
      return updatedItems;
    });
  }

  if (!menuItems.length) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
        {selectedMenuCategoryId
          ? "No menu items found. A menu category must have at least one menu item."
          : "Select a menu category."}
      </Typography>
    );
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleMenuItemSort}>
      <SortableContext items={items}>
        <Stack spacing={2} sx={{ my: 3 }}>
          {items.map((menuItem) => (
            <MenuItem key={menuItem.id} menuItem={menuItem} />
          ))}

          <Box sx={{ alignSelf: "center" }}>
            <CustomPagination
              page={page}
              totalPages={selectedMenuCategory?.menu_items.last_page || 1}
              menuCategoryId={selectedMenuCategoryId}
              setPage={setPage}
            />
          </Box>
        </Stack>
      </SortableContext>
    </DndContext>
  );
}
