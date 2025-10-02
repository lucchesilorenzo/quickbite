import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
  Stack,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import { useCustomerCheckout } from "@/hooks/contexts/useCustomerCheckout";
import {
  TCheckoutDeliveryTimeFormSchema,
  checkoutDeliveryTimeFormSchema,
} from "@/validations/checkout-validations";

const deliveryTimes = [{ label: "As soon as possible", value: "asap" }];

type DeliveryTimeFormProps = {
  setOpenDeliveryTimeDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeliveryTimeForm({
  setOpenDeliveryTimeDialog,
}: DeliveryTimeFormProps) {
  const { checkoutData, restaurantId, setCheckoutData } = useCustomerCheckout();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(checkoutDeliveryTimeFormSchema),
    defaultValues: {
      delivery_time:
        checkoutData[restaurantId].delivery_time?.delivery_time || "",
    },
  });

  function onSubmit(data: TCheckoutDeliveryTimeFormSchema) {
    setCheckoutData((prev) => ({
      ...prev,
      [restaurantId]: {
        ...prev[restaurantId],
        delivery_time: data,
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
        name="delivery_time"
        control={control}
        render={({ field }) => {
          return (
            <List disablePadding>
              {deliveryTimes.map((option, index) => (
                <Box key={option.value}>
                  <ListItem disablePadding disableGutters>
                    <ListItemButton
                      sx={{ px: 3 }}
                      onClick={() => field.onChange(option.value)}
                    >
                      <ListItemText
                        primary={option.label}
                        sx={{
                          "& .MuiListItemText-primary": {
                            fontWeight:
                              field.value === option.value ? 500 : 400,
                          },
                        }}
                      />

                      <Radio
                        checked={field.value === option.value}
                        value={option.value}
                        onChange={() => field.onChange(option.value)}
                      />
                    </ListItemButton>
                  </ListItem>

                  {index !== deliveryTimes.length - 1 && <Divider />}
                </Box>
              ))}

              {errors.delivery_time?.message && (
                <FormHelperTextError message={errors.delivery_time.message} />
              )}
            </List>
          );
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <Button
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          loadingIndicator="Saving..."
          variant="contained"
        >
          Save
        </Button>
      </Box>
    </Stack>
  );
}
