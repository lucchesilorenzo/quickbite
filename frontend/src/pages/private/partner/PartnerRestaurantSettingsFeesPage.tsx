import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Container } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

import PartnerSettingsFeesFormCard from "@/components/partner/restaurant/settings/fees/PartnerSettingsFeesFormCard";
import PartnerSettingsFeesHeader from "@/components/partner/restaurant/settings/fees/PartnerSettingsFeesHeader";
import {
  TPartnerRestaurantSettingsFormSchema,
  partnerRestaurantSettingsFormSchema,
} from "@/validations/partner-restaurant-settings-validations";

export default function PartnerRestaurantSettingsFeesPage() {
  useEffect(() => {
    document.title = "Fees | QuickBite";
  }, []);

  const methods = useForm({
    resolver: zodResolver(partnerRestaurantSettingsFormSchema),
    defaultValues: {
      delivery_fee: "",
      delivery_time_min: "",
      delivery_time_max: "",
      service_fee: "",
      min_amount: "",
    },
  });

  const { handleSubmit } = methods;

  const [editMode, setEditMode] = useState(false);

  async function onSubmit(data: TPartnerRestaurantSettingsFormSchema) {
    console.log(data);
  }

  return (
    <FormProvider {...methods}>
      <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          noValidate
        >
          <PartnerSettingsFeesHeader
            editMode={editMode}
            setEditMode={setEditMode}
          />

          <PartnerSettingsFeesFormCard editMode={editMode} />
        </Box>
      </Container>
    </FormProvider>
  );
}
