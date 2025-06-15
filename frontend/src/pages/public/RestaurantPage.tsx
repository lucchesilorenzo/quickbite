import DesktopRestaurantLayout from "@/components/public/restaurants/layouts/DesktopRestaurantLayout";
import MobileRestaurantLayout from "@/components/public/restaurants/layouts/MobileRestaurantLayout";

export default function RestaurantPage() {
  return (
    <>
      <DesktopRestaurantLayout />
      <MobileRestaurantLayout />
    </>
  );
}
