import RestaurantLayoutDesktop from "@/components/restaurant/layouts/RestaurantLayoutDesktop";
import RestaurantLayoutMobile from "@/components/restaurant/layouts/RestaurantLayoutMobile";

export default function RestaurantPage() {
  return (
    <>
      <RestaurantLayoutDesktop />
      <RestaurantLayoutMobile />
    </>
  );
}
