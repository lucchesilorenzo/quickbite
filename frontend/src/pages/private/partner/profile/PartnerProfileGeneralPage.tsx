import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

import PartnerProfileGeneralPersonalInfoCard from "@/components/partner/profile/general/PartnerProfileGeneralPersonalInfoCard";
import PartnerHeadingBlock from "@/components/partner/restaurant/common/PartnerHeadingBlock";
import { useAuth } from "@/hooks/contexts/useAuth";
import {
  TPartnerProfileGeneralFormSchema,
  partnerProfileGeneralFormSchema,
} from "@/validations/partner-profile-general-validations";

export default function PartnerProfileGeneralPage() {
  useEffect(() => {
    document.title = "General information | QuickBite";
  }, []);

  const { user } = useAuth();

  const methods = useForm({
    resolver: zodResolver(partnerProfileGeneralFormSchema),
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      phone_number: user?.phone_number || "",
      date_of_birth: user?.date_of_birth || "",
      street_address: user?.street_address || "",
      building_number: user?.building_number || "",
      postcode: user?.postcode || "",
      city: user?.city || "",
      state: user?.state || "",
    },
  });

  const { handleSubmit } = methods;

  async function onSubmit(data: TPartnerProfileGeneralFormSchema) {
    console.log(data);
  }

  return (
    <Box>
      <FormProvider {...methods}>
        <PartnerHeadingBlock
          title="General information"
          description="Manage your general information of your profile"
        />

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          noValidate
        >
          <PartnerProfileGeneralPersonalInfoCard />
        </Box>
      </FormProvider>
    </Box>
  );
}
