import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Container } from "@mui/material";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useUpdateInfo } from "@partner/hooks/restaurants/settings/useUpdateInfo";
import InfoContainer from "@partner/restaurant/settings/info/InfoContainer";
import {
  TRestaurantSettingsInfoFormSchema,
  restaurantSettingsInfoFormSchema,
} from "@partner/validations/restaurant-settings-validations";
import { FormProvider, useForm } from "react-hook-form";

import InfoProvider from "@/features/private/partner/restaurant/settings/contexts/InfoProvider";

export default function PartnerSettingsInfoPage() {
  useEffect(() => {
    document.title = "Restaurant info | QuickBite";
  }, []);

  const { restaurant } = useRestaurant();

  const { mutateAsync: updateInfo } = useUpdateInfo(restaurant.id);

  const methods = useForm({
    resolver: zodResolver(restaurantSettingsInfoFormSchema),
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
      categories: restaurant.categories.map((c) => c.id),
      logo: restaurant.logo,
      cover: restaurant.cover,
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
