import type { MenuItemResource } from "@/api/models";

/**
 * View model used by menu category navigation components.
 *
 * Each feature maps its own API resource to this type at the boundary, so
 * shared components don't depend on the backend response structure.
 * The partner only provides `id` and `name` (the cart badge is not needed).
 */
export type MenuNavigationCategory = {
  id: string;
  name: string;
  menuItems?: MenuItemResource[];
};
