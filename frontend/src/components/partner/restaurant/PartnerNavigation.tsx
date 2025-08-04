import { Tab, Tabs } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";

import { partnerRoutes } from "@/lib/data";

export default function PartnerNavigation() {
  const { restaurantId } = useParams();
  const { pathname } = useLocation();

  const activeTabValue = partnerRoutes(restaurantId).find((route) =>
    pathname.startsWith(route.href),
  )?.href;

  return (
    <Tabs
      value={activeTabValue}
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      role="navigation"
    >
      {partnerRoutes(restaurantId).map(({ href, label }) => (
        <Tab key={href} label={label} value={href} component={Link} to={href} />
      ))}
    </Tabs>
  );
}
