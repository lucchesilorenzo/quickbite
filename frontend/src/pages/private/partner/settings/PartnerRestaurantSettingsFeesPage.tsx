import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Container } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

import FeesContainer from "@/components/partner/restaurant/settings/fees/FeesContainer";
import PartnerRestaurantSettingsFeesProvider from "@/contexts/private/partner/PartnerFeesProvider";
import { usePartnerRestaurant } from "@/contexts/private/partner/PartnerRestaurantProvider";
import { useUpdateFees } from "@/hooks/react-query/private/partner/restaurants/settings/useUpdateFees";
import {
  TRestaurantSettingsFeesFormSchema,
  restaurantSettingsFeesFormSchema,
} from "@/validations/private/partner/restaurant-settings-validations";

export default function PartnerRestaurantSettingsFeesPage() {
  useEffect(() => {
    document.title = "Fees | QuickBite";
  }, []);

  const { restaurant } = usePartnerRestaurant();

  const { mutateAsync: updateFees } = useUpdateFees(restaurant.id);

  const methods = useForm({
    resolver: zodResolver(restaurantSettingsFeesFormSchema),
    defaultValues: {
      delivery_fee: restaurant.delivery_fee,
      delivery_time_min: restaurant.delivery_time_min || "",
      delivery_time_max: restaurant.delivery_time_max || "",
      service_fee: restaurant.service_fee,
      min_amount: restaurant.min_amount,
    },
  });

  const { handleSubmit } = methods;

  async function onSubmit(data: TRestaurantSettingsFeesFormSchema) {
    await updateFees(data);
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
            <FeesContainer />
          </Box>
        </Container>
      </PartnerRestaurantSettingsFeesProvider>
    </FormProvider>
  );
}
