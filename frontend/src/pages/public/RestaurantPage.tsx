import RestaurantLayoutDesktop from "@public/restaurant/layouts/RestaurantLayoutDesktop";
import RestaurantLayoutMobile from "@public/restaurant/layouts/RestaurantLayoutMobile";

export default function RestaurantPage() {
  return (
    <>
      <RestaurantLayoutDesktop />
      <RestaurantLayoutMobile />
    </>
  );
}
