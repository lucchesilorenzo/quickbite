import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Container } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

import PartnerSettingsInfoFormCard from "@/components/partner/restaurant/settings/info/PartnerSettingsInfoFormCard";
import PartnerSettingsInfoHeader from "@/components/partner/restaurant/settings/info/PartnerSettingsInfoHeader";
import PartnerRestaurantSettingsInfoProvider from "@/contexts/PartnerRestaurantSettingsInfoProvider";
import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";
import {
  TPartnerRestaurantSettingsInfoFormSchema,
  partnerRestaurantSettingsInfoFormSchema,
} from "@/validations/partner-restaurant-settings-validations";

export default function PartnerRestaurantSettingsInfoPage() {
  useEffect(() => {
    document.title = "Restaurant info | QuickBite";
  }, []);

  const { restaurant } = usePartnerRestaurant();

  const methods = useForm({
    resolver: zodResolver(partnerRestaurantSettingsInfoFormSchema),
    defaultValues: {
      name: restaurant.name || "",
      description: restaurant.description || "",
      street_address: restaurant.street_address || "",
      building_number: restaurant.building_number || "",
      postcode: restaurant.postcode || "",
      city: restaurant.city || "",
      state: restaurant.state || "",
      email: restaurant.email || "",
      phone_number: restaurant.phone_number || "",
      logo: undefined,
      cover: undefined,
    },
  });

  const { handleSubmit } = methods;

  async function onSubmit(data: TPartnerRestaurantSettingsInfoFormSchema) {
    console.log(data);
  }

  return (
    <FormProvider {...methods}>
      <PartnerRestaurantSettingsInfoProvider>
        <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            noValidate
          >
            <PartnerSettingsInfoHeader />
            <PartnerSettingsInfoFormCard />
          </Box>
        </Container>
      </PartnerRestaurantSettingsInfoProvider>
    </FormProvider>
  );
}
