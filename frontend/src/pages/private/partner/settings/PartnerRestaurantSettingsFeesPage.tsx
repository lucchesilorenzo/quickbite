import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Container } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

import DesktopSettingsFeesLayout from "@/components/partner/restaurant/settings/fees/layouts/DesktopSettingsFeesLayout";
import MobileSettingsFeesLayout from "@/components/partner/restaurant/settings/fees/layouts/MobileSettingsFeesLayout";
import PartnerRestaurantSettingsFeesProvider from "@/contexts/private/partner/PartnerRestaurantSettingsFeesProvider";
import { usePartnerRestaurant } from "@/hooks/contexts/private/partner/usePartnerRestaurant";
import { useUpdatePartnerRestaurantSettingsFees } from "@/hooks/react-query/private/partners/restaurants/settings/fees/useUpdatePartnerRestaurantSettingsFees";
import {
  TPartnerRestaurantSettingsFeesFormSchema,
  partnerRestaurantSettingsFeesFormSchema,
} from "@/validations/partner-restaurant-settings-validations";

export default function PartnerRestaurantSettingsFeesPage() {
  useEffect(() => {
    document.title = "Fees | QuickBite";
  }, []);

  const { restaurant } = usePartnerRestaurant();

  const { mutateAsync: updatePartnerRestaurantSettingsFees } =
    useUpdatePartnerRestaurantSettingsFees(restaurant.id);

  const methods = useForm({
    resolver: zodResolver(partnerRestaurantSettingsFeesFormSchema),
    defaultValues: {
      delivery_fee: restaurant.delivery_fee || "",
      delivery_time_min: restaurant.delivery_time_min || "",
      delivery_time_max: restaurant.delivery_time_max || "",
      service_fee: restaurant.service_fee || "",
      min_amount: restaurant.min_amount || "",
    },
  });

  const { handleSubmit } = methods;

  async function onSubmit(data: TPartnerRestaurantSettingsFeesFormSchema) {
    await updatePartnerRestaurantSettingsFees(data);
  }

  return (
    <FormProvider {...methods}>
      <PartnerRestaurantSettingsFeesProvider>
        <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            noValidate
          >
            <DesktopSettingsFeesLayout />
            <MobileSettingsFeesLayout />
          </Box>
        </Container>
      </PartnerRestaurantSettingsFeesProvider>
    </FormProvider>
  );
}
