import { Divider, Stack, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";

import AntSwitch from "@/components/AntSwitch";
import { TProfileNotificationsFormSchema } from "@/features/private/partner/validations/profile-notifications-validations";

const notificationPreferences = [
  {
    value: "new_order",
    title: "New orders",
    subtitle: "Receive a notification when new orders are placed",
  },
  {
    value: "new_review",
    title: "New reviews",
    subtitle: "Receive a notification when new reviews are placed",
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
                <AntSwitch
                  {...field}
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </Stack>

          {notificationPreferences.length - 1 !== index && <Divider />}
        </Fragment>
      ))}
    </Stack>
  );
}
