import { useEffect } from "react";

import { Box } from "@mui/material";
import { useCookies } from "react-cookie";

export default function AreaPage() {
  const [cookie] = useCookies(["address"]);

  const city = cookie.address.address?.city;
  const postalCode = cookie.address.address?.postcode;

  const displayName =
    !city || !postalCode
      ? cookie.address.display_name
      : `${city}, ${postalCode}`;

  useEffect(() => {
    document.title = `Restaurants and takeaways in ${displayName} | QuickBite`;
  }, [displayName]);

  return <Box component="main">AreaPage</Box>;
}
