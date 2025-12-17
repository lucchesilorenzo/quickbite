import { Tab, Tabs } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import { riderUnemployedRoutes } from "../lib/constants/navigation";

export default function Navigation() {
  const { pathname } = useLocation();

  const activeTabValue = riderUnemployedRoutes.find((route) =>
    pathname.startsWith(route.href),
  )?.href;

  return (
    <Tabs value={activeTabValue || false} role="navigation">
      {riderUnemployedRoutes.map(({ href, label }) => (
        <Tab key={href} label={label} value={href} component={Link} to={href} />
      ))}
    </Tabs>
  );
}
