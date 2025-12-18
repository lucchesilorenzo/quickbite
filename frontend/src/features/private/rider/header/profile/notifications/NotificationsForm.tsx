import { Divider, Stack, Typography } from "@mui/material";
import { TProfileNotificationsFormSchema } from "@rider/schemas/profile-notifications.schema";
import { Controller, useFormContext } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";

import AntSwitch from "@/components/common/AntSwitch";

const notificationPreferences = [
  {
    value: "new_delivery",
    title: "New deliveries",
    subtitle: "Receive a notification when new deliveries are placed",
  },
] as const;

export default function NotificationsForm() {
  const { control } = useFormContext<TProfileNotificationsFormSchema>();

  return (
    <Stack spacing={2} sx={{ mt: 4 }}>
      {notificationPreferences.map((preference, index) => (
        <Fragment key={preference.value}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack spacing={0.5}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {preference.title}
              </Typography>

              <Typography variant="body2">{preference.subtitle}</Typography>
            </Stack>

            <Controller
              name={preference.value}
              control={control}
              render={({ field }) => (
                <AntSwitch checked={field.value} onChange={field.onChange} />
              )}
            />
          </Stack>

          {notificationPreferences.length - 1 !== index && <Divider />}
        </Fragment>
      ))}
    </Stack>
  );
}
