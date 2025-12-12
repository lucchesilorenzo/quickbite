import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Container } from "@mui/material";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useUpdateFees } from "@partner/hooks/restaurants/settings/useUpdateFees";
import FeesProvider from "@partner/restaurant/settings/contexts/FeesProvider";
import FeesContainer from "@partner/restaurant/settings/fees/FeesContainer";
import {
  TRestaurantSettingsFeesFormSchema,
  restaurantSettingsFeesFormSchema,
} from "@partner/schemas/restaurant-settings.schema";
import { FormProvider, useForm } from "react-hook-form";

export default function PartnerSettingsFeesPage() {
  useEffect(() => {
    document.title = "Fees | QuickBite";
  }, []);

  const { restaurantData } = useRestaurant();

  const { mutate: updateFees, isPending: isUpdating } = useUpdateFees({
    restaurantId: restaurantData.restaurant.id,
  });

  const methods = useForm({
    resolver: zodResolver(restaurantSettingsFeesFormSchema),
    defaultValues: {
      delivery_fee: restaurantData.restaurant.delivery_fee,
      min_delivery_time: restaurantData.restaurant.min_delivery_time || "",
      max_delivery_time: restaurantData.restaurant.max_delivery_time || "",
      service_fee: restaurantData.restaurant.service_fee,
      min_amount: restaurantData.restaurant.min_amount,
    },
  });

  const { handleSubmit } = methods;

  function onSubmit(data: TRestaurantSettingsFeesFormSchema) {
    updateFees(data);
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
            <FeesContainer isUpdating={isUpdating} />
          </Box>
        </Container>
      </FeesProvider>
    </FormProvider>
  );
}
