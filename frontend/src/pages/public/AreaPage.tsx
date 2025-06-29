import { useEffect, useState } from "react";

import { Container } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import DesktopAreaLayout from "@/components/area/layouts/DesktopAreaLayout";
import MobileAreaLayout from "@/components/area/layouts/MobileAreaLayout";
import { useAddress } from "@/hooks/contexts/useAddress";
import { useRestaurant } from "@/hooks/contexts/useRestaurant";
import env from "@/lib/env";
import { Address } from "@/types";

export default function AreaPage() {
  const [searchParams] = useSearchParams();

  const {
    restaurants,
    isRestaurantsLoading,
    restaurantsError,
    isMapViewMobile,
  } = useRestaurant();
  const { currentAddress, setCurrentAddress } = useAddress();

  const [addressError, setAddressError] = useState(false);

  useEffect(() => {
    document.title = `Restaurants and takeaways in ${currentAddress?.address.city || currentAddress?.address.postcode || "your area"} | QuickBite`;
  }, [currentAddress]);

  useEffect(() => {
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (currentAddress || !lat || !lon) return;

    async function fetchAddress() {
      try {
        const { data } = await axios.get<Address>(
          `https://eu1.locationiq.com/v1/reverse?key=${env.VITE_LOCATIONIQ_API_KEY}&lat=${lat}&lon=${lon}&format=json&normalizeaddress=1`,
        );

        setCurrentAddress(data);
      } catch {
        setAddressError(true);
      }
    }

    fetchAddress();
  }, [currentAddress, setCurrentAddress, searchParams]);

  const isLoading = isRestaurantsLoading;
  const hasNoResults = !restaurants.length || restaurantsError || addressError;

  return (
    <Container
      maxWidth="lg"
      component="main"
      disableGutters
      sx={{ p: isMapViewMobile ? 0 : 3 }}
    >
      <DesktopAreaLayout isLoading={isLoading} hasNoResults={hasNoResults} />
      <MobileAreaLayout isLoading={isLoading} hasNoResults={hasNoResults} />
    </Container>
  );
}
