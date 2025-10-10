import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Container } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

import InfoContainer from "@/components/partner/restaurant/settings/info/InfoContainer";
import PartnerRestaurantSettingsInfoProvider from "@/contexts/private/partner/PartnerInfoProvider";
import { usePartnerRestaurant } from "@/hooks/contexts/private/partner/usePartnerRestaurant";
import { useUpdateInfo } from "@/hooks/react-query/private/partner/restaurants/settings/useUpdateInfo";
import {
  TRestaurantSettingsInfoFormSchema,
  restaurantSettingsInfoFormSchema,
} from "@/validations/private/partner/restaurant-settings-validations";

export default function PartnerRestaurantSettingsInfoPage() {
  useEffect(() => {
    document.title = "Restaurant info | QuickBite";
  }, []);

  const { restaurant } = usePartnerRestaurant();

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
      <PartnerRestaurantSettingsInfoProvider>
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
      </PartnerRestaurantSettingsInfoProvider>
    </FormProvider>
  );
}
