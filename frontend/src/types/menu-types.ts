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

// === PARTNER ===

export type PartnerMenuCategoryWithMenuItemPagination = MenuCategory & {
  menu_items: PartnerMenuItemWithPagination;
};

export type PartnerMenuItemWithPagination = {
  current_page: number;
  data: MenuItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};
