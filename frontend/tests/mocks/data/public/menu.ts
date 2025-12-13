import { MenuCategory, MenuItem } from "@/types/menu/menu.types";

export const menuItem: MenuItem = {
  id: "0199e1dc-796d-7323-9cc3-abdece74db4e",
  menu_category_id: "0199e1dc-7962-7165-96dd-4d3122f979a0",
  name: "Chianti Red Wine",
  description: "A glass of classic Tuscan Chianti red wine",
  price: 4.5,
  image: "/storage/restaurants/menu-items/default/chianti.jpg",
  is_available: true,
  order: 1,
  created_at: "2025-10-14T08:35:46.000000Z",
  updated_at: "2025-10-14T08:35:46.000000Z",
};

export const menuCategories: MenuCategory[] = [
  {
    id: "0199e1dc-7962-7165-96dd-4d3122f979a0",
    restaurant_id: "a01c3a1f-5f95-45e7-8cc8-4c7bcda56d46",
    name: "Drinks",
    description: "Refreshing beverages to pair with your food.",
    order: 0,
    created_at: "2025-10-14T08:35:46.000000Z",
    updated_at: "2025-10-15T22:41:21.000000Z",
    menu_items: [menuItem],
  },
];
