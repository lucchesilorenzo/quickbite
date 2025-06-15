import RestaurantOverviewMobile from "../mobile/RestaurantOverviewMobile";
import RestaurantOverviewDesktop from "./RestaurantOverviewDesktop";

export default function RestaurantOverview() {
  return (
    <>
      <RestaurantOverviewDesktop />
      <RestaurantOverviewMobile />
    </>
  );
}
