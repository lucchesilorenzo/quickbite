import { useEffect, useState } from "react";

import { Container } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import AreaLayoutDesktop from "@/components/area/layouts/AreaLayoutDesktop";
import AreaLayoutMobile from "@/components/area/layouts/AreaLayoutMobile";
import { useAddress } from "@/hooks/contexts/public/useAddress";
import { useRestaurants } from "@/hooks/contexts/public/useRestaurants";
import env from "@/lib/env";
import { Address } from "@/types";

export default function AreaPage() {
  const [searchParams] = useSearchParams();
  const [addressError, setAddressError] = useState(false);

  const {
    totalRestaurants,
    isRestaurantsLoading,
    restaurantsError,
    isMapViewMobile,
  } = useRestaurants();
  const { currentAddress, setCurrentAddress } = useAddress();

  const hasNoResults = !totalRestaurants || restaurantsError || addressError;

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
          `https://eu1.locationiq.com/v1/reverse?key=${env.VITE_LOCATIONIQ_API_KEY}&lat=${lat}&lon=${lon}&format=json&normalizeaddress=1&countrycodes=IT`,
        );

        setCurrentAddress(data);
      } catch {
        setAddressError(true);
      }
    }

    fetchAddress();
  }, [currentAddress, searchParams, setCurrentAddress]);

  return (
    <Container
      maxWidth="lg"
      component="main"
      disableGutters
      sx={{ p: isMapViewMobile ? 0 : 3 }}
    >
      <AreaLayoutDesktop
        isLoading={isRestaurantsLoading}
        hasNoResults={hasNoResults}
      />
      <AreaLayoutMobile
        isLoading={isRestaurantsLoading}
        hasNoResults={hasNoResults}
      />
    </Container>
  );
}
