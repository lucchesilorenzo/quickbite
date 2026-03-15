import { BaseRestaurant } from "@/types/restaurants/restaurant.types";
import { Role } from "@/types/user.types";

export type RestaurantWithPivot = BaseRestaurant & {
  pivot: {
    user_id: string;
    restaurant_id: string;
    role: Role;
    is_active: boolean;
  };
};
