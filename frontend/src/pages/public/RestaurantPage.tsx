import RestaurantLayoutDesktop from "@/features/public/restaurant/layouts/RestaurantLayoutDesktop";
import RestaurantLayoutMobile from "@/features/public/restaurant/layouts/RestaurantLayoutMobile";

export default function RestaurantPage() {
  return (
    <>
      <RestaurantLayoutDesktop />
      <RestaurantLayoutMobile />
    </>
  );
}
