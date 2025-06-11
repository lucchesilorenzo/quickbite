import DesktopRestaurantLayout from "@/components/restaurants/layouts/DesktopRestaurantLayout";
import MobileRestaurantLayout from "@/components/restaurants/layouts/MobileRestaurantLayout";
import MultiCartProvider from "@/contexts/MultiCartProvider";
import SingleRestaurantProvider from "@/contexts/SingleRestaurantProvider";

export default function RestaurantPage() {
  return (
    <SingleRestaurantProvider>
      <MultiCartProvider>
        <DesktopRestaurantLayout />
        <MobileRestaurantLayout />
      </MultiCartProvider>
    </SingleRestaurantProvider>
  );
}
