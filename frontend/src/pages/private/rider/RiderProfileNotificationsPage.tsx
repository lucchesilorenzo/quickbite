import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack } from "@mui/material";
import NotificationsCard from "@rider/header/profile/notifications/NotificationsCard";
import { useUpdateProfileNotifications } from "@rider/hooks/profile/useUpdateProfileNotifications";
import {
  TProfileNotificationsFormSchema,
  profileNotificationsFormSchema,
} from "@rider/schemas/profile-notifications.schema";
import { FormProvider, useForm } from "react-hook-form";

import HeadingBlock from "@/components/common/HeadingBlock";
import { useAuth } from "@/contexts/AuthProvider";
import { NotificationType } from "@/types/user.types";

export default function RiderProfileNotificationsPage() {
  useEffect(() => {
    document.title = "Notification preferences | QuickBite";
  }, []);

  const { user } = useAuth();

  const { mutate: updateProfileNotifications, isPending: isUpdating } =
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

  function onSubmit(data: TProfileNotificationsFormSchema) {
    updateProfileNotifications(data);
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
            loading={isSubmitting || isUpdating}
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
