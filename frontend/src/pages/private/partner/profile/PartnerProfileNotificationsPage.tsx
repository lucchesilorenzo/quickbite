import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

import PartnerProfileNotificationsCard from "@/components/partner/profile/notifications/PartnerProfileNotificationsCard";
import PartnerHeadingBlock from "@/components/partner/restaurant/common/PartnerHeadingBlock";
import { useAuth } from "@/hooks/contexts/useAuth";
import { useUpdatePartnerProfileNotifications } from "@/hooks/react-query/private/partners/profile/useUpdatePartnerProfileNotifications";
import { NotificationType } from "@/types";
import {
  TPartnerProfileNotificationsFormSchema,
  partnerProfileNotificationsFormSchema,
} from "@/validations/partner-profile-notifications-validations";

export default function PartnerProfileNotificationsPage() {
  useEffect(() => {
    document.title = "Notification preferences | QuickBite";
  }, []);

  const { user } = useAuth();

  const { mutateAsync: updatePartnerProfileNotifications } =
    useUpdatePartnerProfileNotifications();

  const defaultValues = user?.notification_preferences.reduce(
    (acc, pref) => {
      acc[pref.type] = pref.enabled;
      return acc;
    },
    {} as Record<NotificationType, boolean>,
  );

  const methods = useForm({
    resolver: zodResolver(partnerProfileNotificationsFormSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  async function onSubmit(data: TPartnerProfileNotificationsFormSchema) {
    await updatePartnerProfileNotifications(data);
  }

  return (
    <FormProvider {...methods}>
      <PartnerHeadingBlock
        title="Notifications"
        description="Manage your notifications preferences"
      />

      <Stack
        component="form"
        spacing={2}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <PartnerProfileNotificationsCard />

        <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
          <Button
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            loadingIndicator="Saving..."
            variant="contained"
            sx={{
              bgcolor: "#212121",
              color: "white",
              "&:hover": { bgcolor: "#333333" },
            }}
          >
            Save preferences
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
