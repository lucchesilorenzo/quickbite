import { zodResolver } from "@hookform/resolvers/zod";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useUpdateDeliveryTimes } from "@partner/hooks/restaurants/settings/useUpdateDeliveryTimes";
import {
  TRestaurantSettingsDeliveryTimesFormSchema,
  restaurantSettingsDeliveryTimesFormSchema,
} from "@partner/schemas/restaurant-settings.schema";
import { format } from "date-fns";
import { Controller, useForm, useWatch } from "react-hook-form";

import AntSwitch from "@/components/common/AntSwitch";
import FormHelperTextError from "@/components/common/FormHelperTextError";
import { capitalize } from "@/lib/utils/formatting";

export default function DeliveryTimesEditTab() {
  const { restaurantData } = useRestaurant();

  const { mutate: updateDeliveryTimes, isPending: isUpdating } =
    useUpdateDeliveryTimes({ restaurantId: restaurantData.restaurant.id });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting, errors },
    clearErrors,
  } = useForm<TRestaurantSettingsDeliveryTimesFormSchema>({
    resolver: zodResolver(restaurantSettingsDeliveryTimesFormSchema),
    defaultValues: {
      delivery_days: restaurantData.restaurant.delivery_days.map((d) => ({
        day: d.day,
        start_time: d.start_time
          ? new Date(`1970-01-01T${d.start_time}`)
          : null,
        end_time: d.end_time ? new Date(`1970-01-01T${d.end_time}`) : null,
        enabled: !!d.start_time || !!d.end_time,
      })),
    },
  });

  const deliveryDays = useWatch({
    control,
    name: "delivery_days",
  });

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  function handleSwitchChange(index: number, checked: boolean) {
    if (!checked) {
      setValue(`delivery_days.${index}.start_time`, null);
      setValue(`delivery_days.${index}.end_time`, null);
      setValue(`delivery_days.${index}.enabled`, false);
      clearErrors(`delivery_days.${index}.start_time`);
    } else {
      setValue(`delivery_days.${index}.enabled`, true);
    }
  }

  function onSubmit(data: TRestaurantSettingsDeliveryTimesFormSchema) {
    const normalized = {
      delivery_days: data.delivery_days.map((d) => ({
        day: d.day,
        start_time: d.start_time ? format(d.start_time, "HH:mm") : null,
        end_time: d.end_time ? format(d.end_time, "HH:mm") : null,
      })),
    };

    updateDeliveryTimes(normalized);
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      {restaurantData.restaurant.delivery_days.map((d, index) => (
        <Box key={d.id}>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", mb: 2 }}
          >
            <Typography
              variant={isMobile ? "body2" : "body1"}
              sx={{ fontWeight: 500 }}
            >
              {capitalize(d.day)}
            </Typography>

            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Typography variant={isMobile ? "body2" : "body1"}>
                Open/Closed
              </Typography>

              <AntSwitch
                id={`restaurant-delivery-switch-${index}`}
                checked={deliveryDays[index].enabled}
                onChange={(e) => handleSwitchChange(index, e.target.checked)}
              />
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Controller
              name={`delivery_days.${index}.start_time`}
              control={control}
              render={({ field }) => (
                <TimePicker
                  {...field}
                  label="Start time"
                  disabled={!deliveryDays[index].enabled}
                  slotProps={{
                    textField: {
                      error: !!errors.delivery_days?.[index]?.start_time,
                    },
                  }}
                />
              )}
            />

            <Typography variant="body1">-</Typography>

            <Controller
              name={`delivery_days.${index}.end_time`}
              control={control}
              render={({ field }) => (
                <TimePicker
                  {...field}
                  label="End time"
                  disabled={!deliveryDays[index].enabled}
                  slotProps={{
                    textField: {
                      error: !!errors.delivery_days?.[index]?.end_time,
                    },
                  }}
                />
              )}
            />
          </Stack>

          <Box sx={{ mt: 1 }}>
            {errors.delivery_days?.[index]?.start_time?.message && (
              <FormHelperTextError
                message={errors.delivery_days?.[index]?.start_time?.message}
              />
            )}
          </Box>

          {d.day !== "sunday" && <Divider sx={{ my: 2 }} />}
        </Box>
      ))}

      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting || isUpdating}
        loading={isSubmitting || isUpdating}
        loadingIndicator="Saving..."
        startIcon={<SaveIcon />}
        sx={{ mt: 3 }}
      >
        Save
      </Button>
    </Box>
  );
}
