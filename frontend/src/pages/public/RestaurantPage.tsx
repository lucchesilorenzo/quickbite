import DesktopRestaurantLayout from "@/components/restaurants/layouts/DesktopRestaurantLayout";
import MobileRestaurantLayout from "@/components/restaurants/layouts/MobileRestaurantLayout";

export default function RestaurantPage() {
  return (
    <>
      <DesktopRestaurantLayout />
      <MobileRestaurantLayout />
    </>
  );
}
