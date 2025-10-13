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
} from "@partner/validations/restaurant-settings-validations";
import { FormProvider, useForm } from "react-hook-form";

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
