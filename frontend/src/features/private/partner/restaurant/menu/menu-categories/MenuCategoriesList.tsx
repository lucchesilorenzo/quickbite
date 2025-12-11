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
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useUpdateMenuCategoriesOrder } from "@partner/hooks/restaurants/menu/categories/useUpdateMenuCategoriesOrder";
import { useGetMenu } from "@partner/hooks/restaurants/menu/useGetMenu";
import { menuDefaults } from "@partner/lib/query-defaults";

import MenuCategoryItem from "./MenuCategoryItem";

import FullPageErrorMessage from "@/components/common/FullPageErrorMessage";
import Spinner from "@/components/common/Spinner";

export default function MenuCategoriesList() {
  const { restaurantData } = useRestaurant();

  const {
    data: menuData = { success: false, message: "", menu: menuDefaults },
    isLoading: isLoadingMenu,
    error: menuError,
  } = useGetMenu({ restaurantId: restaurantData.restaurant.id });

  const { mutateAsync: updateMenuCategoriesOrder } =
    useUpdateMenuCategoriesOrder({
      restaurantId: restaurantData.restaurant.id,
    });

  const debounceUpdateRestaurantMenuCategoriesOrder = useMemo(
    () => debounce(updateMenuCategoriesOrder, 500),
    [updateMenuCategoriesOrder],
  );

  const [items, setItems] = useState(menuData.menu);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );

  useEffect(() => {
    setItems(menuData.menu);
  }, [menuData.menu]);

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

  if (isLoadingMenu) {
    return <Spinner />;
  }

  if (menuError) {
    return <FullPageErrorMessage message={menuError.message} />;
  }

  if (!menuData.menu.length) {
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
