import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";
import { discountRates } from "@/lib/data";
import {
  TPartnerRestaurantSettingsOffersFormSchema,
  partnerRestaurantSettingsOffersFormSchema,
} from "@/validations/partner-restaurant-settings-validations";

type PartnerOffersAddOfferFormProps = {
  setOpenAddOfferDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PartnerOffersAddOfferForm({
  setOpenAddOfferDialog,
}: PartnerOffersAddOfferFormProps) {
  const { restaurant } = usePartnerRestaurant();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(
      partnerRestaurantSettingsOffersFormSchema(restaurant.min_amount),
    ),
    defaultValues: {
      discount_rate: "",
      min_discount_amount: "",
    },
  });

  async function onSubmit(data: TPartnerRestaurantSettingsOffersFormSchema) {
    console.log(data);

    setOpenAddOfferDialog(false);
  }

  return (
    <Stack
      component="form"
      autoComplete="off"
      noValidate
      spacing={4}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack direction="row" spacing={2}>
        <Controller
          name="discount_rate"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.discount_rate} required>
              <InputLabel>Discount rate</InputLabel>

              <Select {...field} label="Discount rate">
                {discountRates.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>

              <Box sx={{ mt: 1 }}>
                {errors.discount_rate?.message && (
                  <FormHelperTextError message={errors.discount_rate.message} />
                )}
              </Box>
            </FormControl>
          )}
        />

        <Controller
          name="min_discount_amount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              label="Minimum discount amount"
              placeholder="Enter minimum discount amount"
              error={!!errors.min_discount_amount}
              helperText={
                errors.min_discount_amount?.message && (
                  <FormHelperTextError
                    message={errors.min_discount_amount.message}
                  />
                )
              }
              fullWidth
              sx={{ minWidth: 150 }}
            />
          )}
        />
      </Stack>

      <Button
        type="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
        loadingIndicator="Adding..."
        variant="contained"
      >
        Add offer
      </Button>
    </Stack>
  );
}
