import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Container } from "@mui/material";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useUpdateFees } from "@partner/hooks/restaurants/settings/useUpdateFees";
import FeesProvider from "@partner/restaurant/settings/contexts/FeesProvider";
import FeesContainer from "@partner/restaurant/settings/fees/FeesContainer";
import { FormProvider, useForm } from "react-hook-form";

import {
  TRestaurantSettingsFeesFormSchema,
  restaurantSettingsFeesFormSchema,
} from "@/features/private/partner/schemas/restaurant-settings.schema";

export default function PartnerSettingsFeesPage() {
  useEffect(() => {
    document.title = "Fees | QuickBite";
  }, []);

  const { restaurant } = useRestaurant();

  const { mutateAsync: updateFees } = useUpdateFees(restaurant.id);

  const methods = useForm({
    resolver: zodResolver(restaurantSettingsFeesFormSchema),
    defaultValues: {
      delivery_fee: restaurant.delivery_fee,
      min_delivery_time: restaurant.min_delivery_time || "",
      max_delivery_time: restaurant.max_delivery_time || "",
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
      <FeesProvider>
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
      </FeesProvider>
    </FormProvider>
  );
}
