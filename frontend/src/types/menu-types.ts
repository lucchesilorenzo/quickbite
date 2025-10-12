export type MenuCategory = {
  id: string;
  restaurant_id: string;
  name: string;
  description: string | null;
  order: number;
  created_at: string;
  updated_at: string;
  menu_items: MenuItem[];
};

export type MenuItem = {
  id: string;
  menu_category_id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  is_available: boolean;
  created_at: string;
  updated_at: string;
};

export type Menu = MenuCategory & {
  menu_items: MenuItem[];
};
