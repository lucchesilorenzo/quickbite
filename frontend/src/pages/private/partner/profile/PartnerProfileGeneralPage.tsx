import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

import PartnerProfileGeneralAddressCard from "@/components/partner/profile/general/PartnerProfileGeneralAddressCard";
import PartnerProfileGeneralPersonalInfoCard from "@/components/partner/profile/general/PartnerProfileGeneralPersonalInfoCard";
import PartnerHeadingBlock from "@/components/partner/restaurant/common/PartnerHeadingBlock";
import { useAuth } from "@/hooks/contexts/public/useAuth";
import { useUpdatePartnerProfileGeneralInformation } from "@/hooks/react-query/private/partner/profile/useUpdatePartnerProfileGeneralInformation";
import {
  TProfileGeneralFormSchema,
  profileGeneralFormSchema,
} from "@/validations/private/partner/profile-general-validations";

export default function PartnerProfileGeneralPage() {
  useEffect(() => {
    document.title = "General information | QuickBite";
  }, []);

  const { user } = useAuth();
  const {
    mutateAsync: updatePartnerProfileGeneralInformation,
    isPending: isUpdating,
  } = useUpdatePartnerProfileGeneralInformation();

  const methods = useForm({
    resolver: zodResolver(profileGeneralFormSchema),
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

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  async function onSubmit(data: TProfileGeneralFormSchema) {
    await updatePartnerProfileGeneralInformation(data);
  }

  return (
    <FormProvider {...methods}>
      <PartnerHeadingBlock
        title="General information"
        description="Manage your general information of your profile"
      />

      <Stack
        component="form"
        spacing={2}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <PartnerProfileGeneralPersonalInfoCard />
        <PartnerProfileGeneralAddressCard />

        <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
          <Button
            type="submit"
            disabled={isSubmitting || isUpdating}
            loading={isSubmitting || isUpdating}
            loadingIndicator="Saving..."
            variant="contained"
            sx={{
              bgcolor: "#212121",
              color: "white",
              "&:hover": { bgcolor: "#333333" },
            }}
          >
            Save changes
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
