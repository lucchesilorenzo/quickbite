import { MenuCategory, MenuItem } from "@/types/menu/menu.types";
import { BaseOffsetPagination } from "@/types/pagination.types";

export type PartnerMenu = Omit<MenuCategory, "menu_items"> & {
  menu_items: PartnerMenuItemWithPagination;
};

export type PartnerMenuItemWithPagination = BaseOffsetPagination & {
  data: MenuItem[];
};
