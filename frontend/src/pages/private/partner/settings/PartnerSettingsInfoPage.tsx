import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Container } from "@mui/material";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useUpdateInfo } from "@partner/hooks/restaurants/settings/useUpdateInfo";
import InfoProvider from "@partner/restaurant/settings/contexts/InfoProvider";
import InfoContainer from "@partner/restaurant/settings/info/InfoContainer";
import {
  TRestaurantSettingsInfoFormSchema,
  restaurantSettingsInfoFormSchema,
} from "@partner/schemas/restaurant-settings.schema";
import { FormProvider, useForm } from "react-hook-form";

export default function PartnerSettingsInfoPage() {
  useEffect(() => {
    document.title = "Restaurant info | QuickBite";
  }, []);

  const { restaurantData } = useRestaurant();

  const { mutate: updateInfo, isPending: isUpdating } = useUpdateInfo({
    restaurantId: restaurantData.data.id,
  });

  const methods = useForm({
    resolver: zodResolver(restaurantSettingsInfoFormSchema),
    defaultValues: {
      name: restaurantData.data.name || "",
      description: restaurantData.data.description || "",
      street_address: restaurantData.data.street_address || "",
      building_number: restaurantData.data.building_number || "",
      postcode: restaurantData.data.postcode || "",
      city: restaurantData.data.city || "",
      state: restaurantData.data.state || "",
      email: restaurantData.data.email || "",
      phone_number: restaurantData.data.phone_number || "",
      categories: restaurantData.data.categories?.map((c) => c.id) ?? [],
      logo: restaurantData.data.logo,
      cover: restaurantData.data.cover,
    },
  });

  const { handleSubmit } = methods;

  function onSubmit(data: TRestaurantSettingsInfoFormSchema) {
    updateInfo({
      name: data.name,
      description: data.description,
      street_address: data.street_address,
      building_number: data.building_number,
      postcode: data.postcode,
      city: data.city,
      state: data.state,
      email: data.email,
      phone_number: data.phone_number,
      categories: data.categories,
      logo:
        data.logo instanceof FileList && data.logo.length > 0
          ? data.logo[0]
          : typeof data.logo === "string"
            ? data.logo
            : undefined,
      cover:
        data.cover instanceof FileList && data.cover.length > 0
          ? data.cover[0]
          : typeof data.cover === "string"
            ? data.cover
            : undefined,
    });
  }

  return (
    <FormProvider {...methods}>
      <InfoProvider>
        <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            noValidate
          >
            <InfoContainer isUpdating={isUpdating} />
          </Box>
        </Container>
      </InfoProvider>
    </FormProvider>
  );
}
