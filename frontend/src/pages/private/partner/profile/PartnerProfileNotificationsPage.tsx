import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

import { useAuth } from "@/contexts/AuthProvider";
import HeadingBlock from "@/features/private/partner/components/HeadingBlock";
import { useUpdateProfileNotifications } from "@/features/private/partner/hooks/profile/useUpdateProfileNotifications";
import NotificationsCard from "@/features/private/partner/profile/notifications/NotificationsCard";
import {
  TProfileNotificationsFormSchema,
  profileNotificationsFormSchema,
} from "@/features/private/partner/schemas/profile-notifications.schema";
import { NotificationType } from "@/types/user.types";

export default function PartnerProfileNotificationsPage() {
  useEffect(() => {
    document.title = "Notification preferences | QuickBite";
  }, []);

  const { user } = useAuth();

  const { mutateAsync: updateProfileNotifications } =
    useUpdateProfileNotifications();

  const defaultValues = user?.notification_preferences.reduce(
    (acc, pref) => {
      acc[pref.type] = pref.enabled;
      return acc;
    },
    {} as Record<NotificationType, boolean>,
  );

  const methods = useForm({
    resolver: zodResolver(profileNotificationsFormSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  async function onSubmit(data: TProfileNotificationsFormSchema) {
    await updateProfileNotifications(data);
  }

  return (
    <FormProvider {...methods}>
      <HeadingBlock
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
        <NotificationsCard />

        <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
          <Button
            type="submit"
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
