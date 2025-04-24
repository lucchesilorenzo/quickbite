import { useEffect } from "react";

import { Container, Grid } from "@mui/material";
import { useCookies } from "react-cookie";

import RestaurantFiltersSidebar from "@/components/area/content/RestaurantFiltersSidebar";
import RestaurantList from "@/components/area/content/RestaurantList";

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

  return (
    <Container maxWidth="lg" component="main" sx={{ p: 2 }}>
      <Grid container>
        <Grid size={{ xs: 12, md: 3 }}>
          <RestaurantFiltersSidebar />
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          <RestaurantList />
        </Grid>
      </Grid>
    </Container>
  );
}
