import RestaurantLayoutDesktop from "@/components/restaurants/layouts/RestaurantLayoutDesktop";
import RestaurantLayoutMobile from "@/components/restaurants/layouts/RestaurantLayoutMobile";

export default function RestaurantPage() {
  return (
    <>
      <RestaurantLayoutDesktop />
      <RestaurantLayoutMobile />
    </>
  );
}
