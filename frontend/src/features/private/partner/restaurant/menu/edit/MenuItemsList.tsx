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
import { menuDefaults } from "@partner/lib/query-defaults";

import MenuItem from "./MenuItem";

import CustomPagination from "@/components/CustomPagination";
import Spinner from "@/components/Spinner";
import { usePartnerMenu } from "@/features/private/partner/contexts/PartnerMenuProvider";
import { usePartnerRestaurant } from "@/features/private/partner/contexts/PartnerRestaurantProvider";
import { useUpdateMenuItemsOrder } from "@/features/private/partner/hooks/restaurants/menu/items/useUpdateMenuItemsOrder";
import { useGetMenu } from "@/features/private/partner/hooks/restaurants/menu/useGetMenu";

export default function MenuItemsList() {
  const { restaurant } = usePartnerRestaurant();
  const { selectedMenuCategoryId } = usePartnerMenu();

  const [page, setPage] = useState(1);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );

  const {
    data: menuCategoriesWithMenuItemsPagination = menuDefaults,
    isLoading: isLoadingMenuCategories,
  } = useGetMenu(restaurant.id, page);

  const { mutateAsync: updateMenuItemsOrder } = useUpdateMenuItemsOrder(
    restaurant.id,
  );

  const debounceUpdateRestaurantMenuItemsOrder = useMemo(
    () => debounce(updateMenuItemsOrder, 500),
    [updateMenuItemsOrder],
  );

  const selectedMenuCategory = menuCategoriesWithMenuItemsPagination.find(
    (c) => c.id === selectedMenuCategoryId,
  );

  const menuItems = selectedMenuCategory?.menu_items.data;

  const [items, setItems] = useState(menuItems || []);

  useEffect(() => {
    if (!menuItems) return;

    setItems(menuItems);
  }, [menuItems, items]);

  if (isLoadingMenuCategories) return <Spinner />;

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

  if (!menuItems || !menuItems.length) {
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
              totalPages={selectedMenuCategory?.menu_items.last_page}
              menuCategoryId={selectedMenuCategoryId}
              setPage={setPage}
            />
          </Box>
        </Stack>
      </SortableContext>
    </DndContext>
  );
}
