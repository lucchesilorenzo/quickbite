import { Tab, Tabs } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";

import { partnerRestaurantRoutes } from "@/lib/data";

export default function PartnerRestaurantNavigation() {
  const { restaurantId } = useParams();
  const { pathname } = useLocation();

  const activeTabValue = partnerRestaurantRoutes(restaurantId).find((route) =>
    pathname.startsWith(route.href),
  )?.href;

  return (
    <Tabs value={activeTabValue || false} role="navigation">
      {partnerRestaurantRoutes(restaurantId).map(({ href, label }) => (
        <Tab key={href} label={label} value={href} component={Link} to={href} />
      ))}
    </Tabs>
  );
}
