import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { Controller, useForm } from "react-hook-form";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import { useAuth } from "@/hooks/contexts/useAuth";
import { useCheckout } from "@/hooks/contexts/useCheckout";
import {
  TCheckoutPersonalInfoForm,
  checkoutPersonalInfoForm,
} from "@/validations/checkout-validations";

type PersonalInfoFormProps = {
  setOpenPersonalInfoDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PersonalInfoForm({
  setOpenPersonalInfoDialog,
}: PersonalInfoFormProps) {
  const { user } = useAuth();
  const { checkoutData, setCheckoutData } = useCheckout();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(checkoutPersonalInfoForm),
    defaultValues: {
      first_name:
        checkoutData.personal_info?.first_name || user?.first_name || "",
      last_name: checkoutData.personal_info?.last_name || user?.last_name || "",
      phone_number:
        checkoutData.personal_info?.phone_number || user?.phone_number || "",
    },
  });

  function onSubmit(data: TCheckoutPersonalInfoForm) {
    setCheckoutData((prev) => ({
      ...prev,
      personal_info: data,
    }));
    setOpenPersonalInfoDialog(false);
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
        name="first_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            autoComplete="off"
            label="First name"
            error={!!errors.first_name}
            helperText={
              errors.first_name?.message && (
                <FormHelperTextError message={errors.first_name.message} />
              )
            }
            fullWidth
            sx={{ minWidth: 150 }}
          />
        )}
      />

      <Controller
        name="last_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            label="Last name"
            error={!!errors.last_name}
            helperText={
              errors.last_name?.message && (
                <FormHelperTextError message={errors.last_name.message} />
              )
            }
            fullWidth
            sx={{ minWidth: 150 }}
          />
        )}
      />

      <Controller
        name="phone_number"
        control={control}
        render={({ field }) => (
          <MuiTelInput
            {...field}
            required
            label="Phone number"
            defaultCountry="IT"
            onlyCountries={["IT"]}
            forceCallingCode
            disableDropdown
            error={!!errors.phone_number}
            helperText={
              errors.phone_number?.message && (
                <FormHelperTextError message={errors.phone_number.message} />
              )
            }
          />
        )}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
        loadingIndicator="Saving..."
        variant="contained"
      >
        Save
      </Button>
    </Stack>
  );
}
