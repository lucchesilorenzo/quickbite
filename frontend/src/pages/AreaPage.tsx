import { useEffect } from "react";

import { Container, Grid } from "@mui/material";
import { useCookies } from "react-cookie";

import RestaurantList from "@/components/area/content/RestaurantList";
import RestaurantFiltersSidebar from "@/components/area/sidebar/RestaurantFiltersSidebar";

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
    <Container maxWidth="lg" component="main" sx={{ p: 3 }}>
      <Grid container spacing={4}>
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
