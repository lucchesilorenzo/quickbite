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

import PartnerMenuEditMenuItem from "./PartnerMenuEditMenuItem";

import CustomPagination from "@/components/common/CustomPagination";
import Spinner from "@/components/common/Spinner";
import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";
import { usePartnerRestaurantMenu } from "@/hooks/contexts/usePartnerRestaurantMenu";
import { useGetPartnerRestaurantMenuCategories } from "@/hooks/react-query/private/partners/restaurants/menu/categories/useGetPartnerRestaurantMenuCategories";
import { useUpdatePartnerRestaurantMenuItemsOrder } from "@/hooks/react-query/private/partners/restaurants/menu/items/useUpdatePartnerRestaurantMenuItemsOrder";

export default function PartnerMenuEditMenuItemsList() {
  const { restaurant } = usePartnerRestaurant();
  const { selectedMenuCategoryId } = usePartnerRestaurantMenu();

  const [page, setPage] = useState(1);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );

  const {
    data: menuCategoriesWithMenuItemsPagination,
    isLoading: isLoadingMenuCategories,
  } = useGetPartnerRestaurantMenuCategories(restaurant.id, page);

  const { mutateAsync: updateRestaurantMenuItemsOrder } =
    useUpdatePartnerRestaurantMenuItemsOrder(restaurant.id);

  const debounceUpdateRestaurantMenuItemsOrder = useMemo(
    () => debounce(updateRestaurantMenuItemsOrder, 500),
    [updateRestaurantMenuItemsOrder],
  );

  const selectedMenuCategory = menuCategoriesWithMenuItemsPagination?.find(
    (c) => c.id === selectedMenuCategoryId,
  );

  const menuItems = selectedMenuCategory?.menu_items.data || [];
  const totalPages = selectedMenuCategory?.menu_items.last_page || 1;

  const [items, setItems] = useState(menuItems);

  useEffect(() => {
    if (JSON.stringify(items) !== JSON.stringify(menuItems)) {
      setItems(menuItems);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuItems]);

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
      <Typography variant="body2" sx={{ textAlign: "center", mt: 4 }}>
        {selectedMenuCategoryId
          ? "No menu items found. A menu category must have at least one menu item."
          : "Select a menu category."}
      </Typography>
    );
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleMenuItemSort}>
      <SortableContext items={items}>
        <Stack spacing={2} sx={{ my: 4 }}>
          {items.map((menuItem) => (
            <PartnerMenuEditMenuItem key={menuItem.id} menuItem={menuItem} />
          ))}

          <Box sx={{ alignSelf: "center" }}>
            <CustomPagination
              page={page}
              totalPages={totalPages}
              menuCategoryId={selectedMenuCategoryId}
              setPage={setPage}
            />
          </Box>
        </Stack>
      </SortableContext>
    </DndContext>
  );
}
