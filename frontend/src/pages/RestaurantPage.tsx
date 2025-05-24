import { useParams } from "react-router-dom";

import { useGetRestaurant } from "@/hooks/react-query/restaurants/useGetRestaurant";

export default function RestaurantPage() {
  const { restaurantSlug } = useParams();

  const { data: restaurant } = useGetRestaurant(restaurantSlug);
  console.log(restaurant);

  return <div>RestaurantPage</div>;
}
