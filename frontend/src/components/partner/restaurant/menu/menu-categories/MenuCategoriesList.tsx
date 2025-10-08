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
import { Box, Grid, Typography, debounce } from "@mui/material";

import MenuCategoryItem from "./MenuCategoryItem";

import Spinner from "@/components/common/Spinner";
import { usePartnerRestaurant } from "@/hooks/contexts/private/partner/usePartnerRestaurant";
import { useUpdatePartnerRestaurantMenuCategoriesOrder } from "@/hooks/react-query/private/partner/restaurants/menu/categories/useUpdatePartnerRestaurantMenuCategoriesOrder";
import { useGetPartnerRestaurantMenu } from "@/hooks/react-query/private/partner/restaurants/menu/useGetPartnerRestaurantMenu";
import { partnerMenuDefaults } from "@/lib/query-defaults";

export default function MenuCategoriesList() {
  const { restaurant } = usePartnerRestaurant();

  const {
    data: menuCategories = partnerMenuDefaults,
    isLoading: isLoadingMenuCategories,
  } = useGetPartnerRestaurantMenu(restaurant.id);

  const { mutateAsync: updateRestaurantMenuCategoriesOrder } =
    useUpdatePartnerRestaurantMenuCategoriesOrder(restaurant.id);

  const debounceUpdateRestaurantMenuCategoriesOrder = useMemo(
    () => debounce(updateRestaurantMenuCategoriesOrder, 500),
    [updateRestaurantMenuCategoriesOrder],
  );

  const [items, setItems] = useState(menuCategories);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );

  useEffect(() => {
    setItems(menuCategories);
  }, [menuCategories]);

  async function handleMenuCategorySort({ active, over }: DragEndEvent) {
    if (active.id === over?.id) return;

    setItems((prev) => {
      const from = prev.findIndex((i) => i.id === active.id);
      const to = prev.findIndex((i) => i.id === over?.id);

      const newItems = arrayMove(prev, from, to);
      const updatedItems = newItems.map((item, index) => ({
        ...item,
        order: index,
      }));

      debounceUpdateRestaurantMenuCategoriesOrder(updatedItems);

      return updatedItems;
    });
  }

  if (isLoadingMenuCategories) return <Spinner />;

  if (!menuCategories.length) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center", mt: 3 }}>
        Start adding your menu categories here.
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Drag and drop menu categories to change their order. The new order will
        automatically update in the public restaurant menu
      </Typography>

      <DndContext sensors={sensors} onDragEnd={handleMenuCategorySort}>
        <SortableContext items={items}>
          <Grid container spacing={1}>
            {items.map((menuCategory) => (
              <Grid key={menuCategory.id} size={{ xs: 6, sm: 4 }}>
                <MenuCategoryItem
                  key={menuCategory.id}
                  menuCategory={menuCategory}
                />
              </Grid>
            ))}
          </Grid>
        </SortableContext>
      </DndContext>
    </Box>
  );
}
