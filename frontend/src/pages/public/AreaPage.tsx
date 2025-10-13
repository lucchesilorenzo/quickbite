import { useEffect, useState } from "react";

import { Container } from "@mui/material";
import AreaLayoutDesktop from "@public/area/layouts/AreaLayoutDesktop";
import AreaLayoutMobile from "@public/area/layouts/AreaLayoutMobile";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import { useAddress } from "@/contexts/AddressProvider";
import { useRestaurants } from "@/contexts/RestaurantsProvider";
import env from "@/lib/env";
import { Address } from "@/types/address-types";

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
