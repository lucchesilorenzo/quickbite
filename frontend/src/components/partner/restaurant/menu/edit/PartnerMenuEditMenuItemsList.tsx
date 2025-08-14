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
import { Stack, Typography, debounce } from "@mui/material";

import PartnerMenuEditMenuItem from "./PartnerMenuEditMenuItem";

import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";
import { usePartnerRestaurantMenu } from "@/hooks/contexts/usePartnerRestaurantMenu";
import { useUpdatePartnerRestaurantMenuItemsOrder } from "@/hooks/react-query/private/partners/restaurants/useUpdatePartnerRestaurantMenuItemsOrder";

export default function PartnerMenuEditMenuItemsList() {
  const { restaurant } = usePartnerRestaurant();
  const { selectedMenuCategoryId } = usePartnerRestaurantMenu();

  const { mutateAsync: updateRestaurantMenuItemsOrder } =
    useUpdatePartnerRestaurantMenuItemsOrder(restaurant.id);

  const debounceUpdateRestaurantMenuItemsOrder = useMemo(
    () => debounce(updateRestaurantMenuItemsOrder, 500),
    [updateRestaurantMenuItemsOrder],
  );

  const menuItems = useMemo(
    () =>
      restaurant.menu_categories.find(
        (menuCategory) => menuCategory.id === selectedMenuCategoryId,
      )?.menu_items || [],
    [restaurant.menu_categories, selectedMenuCategoryId],
  );

  const [items, setItems] = useState(menuItems);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );

  useEffect(() => {
    setItems(menuItems);
  }, [menuItems]);

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
        </Stack>
      </SortableContext>
    </DndContext>
  );
}
