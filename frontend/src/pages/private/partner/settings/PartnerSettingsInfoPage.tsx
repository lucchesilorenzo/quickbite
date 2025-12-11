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

  const { mutateAsync: updateInfo } = useUpdateInfo({
    restaurantId: restaurantData.restaurant.id,
  });

  const methods = useForm({
    resolver: zodResolver(restaurantSettingsInfoFormSchema),
    defaultValues: {
      name: restaurantData.restaurant.name || "",
      description: restaurantData.restaurant.description || "",
      street_address: restaurantData.restaurant.street_address || "",
      building_number: restaurantData.restaurant.building_number || "",
      postcode: restaurantData.restaurant.postcode || "",
      city: restaurantData.restaurant.city || "",
      state: restaurantData.restaurant.state || "",
      email: restaurantData.restaurant.email || "",
      phone_number: restaurantData.restaurant.phone_number || "",
      categories: restaurantData.restaurant.categories.map((c) => c.id),
      logo: restaurantData.restaurant.logo,
      cover: restaurantData.restaurant.cover,
    },
  });

  const { handleSubmit } = methods;

  async function onSubmit(data: TRestaurantSettingsInfoFormSchema) {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("street_address", data.street_address);
    formData.append("building_number", data.building_number);
    formData.append("postcode", data.postcode);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("email", data.email);
    formData.append("phone_number", data.phone_number);
    data.categories.forEach((c) => formData.append("categories[]", c));

    if (data.logo instanceof FileList && data.logo.length > 0) {
      formData.append("logo", data.logo[0]);
    } else if (typeof data.logo === "string") {
      formData.append("logo", data.logo);
    }

    if (data.cover instanceof FileList && data.cover.length > 0) {
      formData.append("cover", data.cover[0]);
    } else if (typeof data.cover === "string") {
      formData.append("cover", data.cover);
    }

    await updateInfo(formData);
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
            <InfoContainer />
          </Box>
        </Container>
      </InfoProvider>
    </FormProvider>
  );
}
