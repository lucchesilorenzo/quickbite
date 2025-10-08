import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Divider,
  FormControl,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Radio,
  Select,
  Stack,
} from "@mui/material";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import { useCheckout } from "@/hooks/contexts/private/customer/useCheckout";
import {
  TCheckoutDeliveryTimeFormSchema,
  checkoutDeliveryTimeFormSchema,
} from "@/validations/private/customer/checkout-validations";

type DeliveryTimeFormProps = {
  setOpenDeliveryTimeDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeliveryTimeForm({
  setOpenDeliveryTimeDialog,
}: DeliveryTimeFormProps) {
  const { checkoutData, restaurantId, deliverySlots, setCheckoutData } =
    useCheckout();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    watch,
    setValue,
  } = useForm<TCheckoutDeliveryTimeFormSchema>({
    resolver: zodResolver(checkoutDeliveryTimeFormSchema),
    defaultValues: {
      delivery_type: checkoutData[restaurantId].delivery_time.type,
      delivery_time: checkoutData[restaurantId].delivery_time.value,
    },
  });

  const deliveryType = watch("delivery_type");
  const deliveryTime = watch("delivery_time");

  useEffect(() => {
    if (deliveryType === "schedule") {
      const slots = deliverySlots.delivery_slots;

      if (slots.length > 0 && !slots.includes(deliveryTime)) {
        setValue("delivery_time", slots[0]);
      }
    }
  }, [deliverySlots.delivery_slots, deliveryTime, deliveryType, setValue]);

  function onSubmit(data: TCheckoutDeliveryTimeFormSchema) {
    setCheckoutData((prev) => ({
      ...prev,
      [restaurantId]: {
        ...prev[restaurantId],
        delivery_time: {
          type: data.delivery_type,
          value: data.delivery_time,
        },
      },
    }));
    setOpenDeliveryTimeDialog(false);
  }

  return (
    <Stack
      component="form"
      autoComplete="off"
      noValidate
      spacing={4}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="delivery_type"
        control={control}
        render={({ field }) => (
          <List disablePadding>
            <ListItem disablePadding disableGutters>
              <ListItemButton
                sx={{ px: 3 }}
                onClick={() => field.onChange("asap")}
                disabled={!deliverySlots.is_asap_available}
              >
                <ListItemText primary="As soon as possible" />
                <Radio checked={field.value === "asap"} />
              </ListItemButton>
            </ListItem>

            <Divider />

            <ListItem disablePadding disableGutters>
              <ListItemButton
                sx={{ px: 3 }}
                onClick={() => {
                  if (deliverySlots.delivery_slots.length > 0) {
                    field.onChange("schedule");
                    setValue("delivery_time", deliverySlots.delivery_slots[0]);
                  }
                }}
                disabled={!deliverySlots.delivery_slots.length}
              >
                <ListItemText primary="Schedule for later" />
                <Radio checked={field.value === "schedule"} />
              </ListItemButton>
            </ListItem>

            {deliveryType === "schedule" &&
              deliverySlots.delivery_slots.length > 0 && (
                <Controller
                  name="delivery_time"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth sx={{ px: 3, mt: 2 }}>
                      <Select
                        value={
                          deliverySlots.delivery_slots.includes(field.value)
                            ? field.value
                            : deliverySlots.delivery_slots[0]
                        }
                        onChange={field.onChange}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 200,
                            },
                          },
                        }}
                      >
                        {deliverySlots.delivery_slots.map((slot) => (
                          <MenuItem key={slot} value={slot}>
                            {format(new Date(slot), "HH:mm")}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              )}

            <Box sx={{ p: 1 }}>
              {errors.delivery_time?.message && (
                <FormHelperTextError message={errors.delivery_time.message} />
              )}
            </Box>
          </List>
        )}
      />

      <Stack direction="row" sx={{ justifyContent: "flex-end", p: 2 }}>
        <Button
          type="submit"
          disabled={
            isSubmitting ||
            (!deliverySlots.is_asap_available &&
              !deliverySlots.delivery_slots.length)
          }
          loading={isSubmitting}
          loadingIndicator="Saving..."
          variant="contained"
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
