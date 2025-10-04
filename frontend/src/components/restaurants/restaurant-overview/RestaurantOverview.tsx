import RestaurantOverviewDesktop from "./RestaurantOverviewDesktop";
import RestaurantOverviewMobile from "./mobile/RestaurantOverviewMobile";

export default function RestaurantOverview() {
  return (
    <>
      <RestaurantOverviewDesktop />
      <RestaurantOverviewMobile />
    </>
  );
}
