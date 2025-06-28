import { useEffect, useState } from "react";

import { Container } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

import DesktopAreaLayout from "@/components/area/layouts/DesktopAreaLayout";
import MobileAreaLayout from "@/components/area/layouts/MobileAreaLayout";
import { useAddress } from "@/hooks/contexts/useAddress";
import { useRestaurant } from "@/hooks/contexts/useRestaurant";
import env from "@/lib/env";
import { Address } from "@/types";

export default function AreaPage() {
  const { areaSlug } = useParams();

  const {
    restaurants,
    isRestaurantsLoading,
    restaurantsError,
    isMapViewMobile,
    setAreaSlug,
  } = useRestaurant();
  const { currentAddress, setCurrentAddress } = useAddress();

  const [addressError, setAddressError] = useState(false);

  useEffect(() => {
    document.title = `Restaurants and takeaways in ${currentAddress?.address.city || currentAddress?.address.postcode || "your area"} | QuickBite`;
  }, [currentAddress]);

  useEffect(() => {
    if (currentAddress || !areaSlug) return;

    const updatedAreaSlug = areaSlug.replace(/-/g, ", ");

    async function fetchAddress(value: string) {
      try {
        const { data } = await axios.get<Address[]>(
          `https://api.locationiq.com/v1/autocomplete?key=${env.VITE_LOCATIONIQ_API_KEY}&q=${value}&limit=1&dedupe=1&countrycodes=IT&normalizecity=1`,
        );

        setCurrentAddress(data[0]);
      } catch {
        setAddressError(true);
      }
    }

    fetchAddress(updatedAreaSlug);
  }, [areaSlug, currentAddress, setAreaSlug, setCurrentAddress]);

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
