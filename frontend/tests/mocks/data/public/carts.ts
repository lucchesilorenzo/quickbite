import { Cart, CartItem } from "@/types/cart.types";
import { restaurant } from "@tests/mocks/data/public/restaurants";

export const cartItem: CartItem = {
  id: "0199e1dc-796d-7323-9cc3-abdece74db4e",
  menu_category_id: "0199e1dc-7962-7165-96dd-4d3122f979a0",
  name: "Chianti Red Wine",
  description: "A glass of classic Tuscan Chianti red wine",
  price: 4.5,
  image: "/storage/restaurants/menu-items/default/chianti.jpg",
  is_available: true,
  quantity: 1,
  item_total: 4.5,
  created_at: "2025-11-02T21:28:27.000000Z",
  updated_at: "2025-11-02T21:28:27.000000Z",
};

export const carts: Cart = {
  "a01c3a1f-5f95-45e7-8cc8-4c7bcda56d46": {
    id: "019a4678-b6c7-7236-b726-47ef13862bee",
    restaurant,
    total_items: 1,
    total_unique_items: 1,
    cart_total: 4.5,
    items: [cartItem],
  },
};
