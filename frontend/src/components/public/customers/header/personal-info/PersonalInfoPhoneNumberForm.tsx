import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { Controller, useForm } from "react-hook-form";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import { useAuth } from "@/hooks/contexts/useAuth";
import { isCustomer } from "@/lib/utils";
import {
  TPersonalInfoEditPhoneNumberForm,
  personalInfoEditPhoneNumberForm,
} from "@/validations/personal-info-validations";

export default function PersonalInfoEditPhoneNumberForm() {
  const { user } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({
    resolver: zodResolver(personalInfoEditPhoneNumberForm),
    defaultValues: {
      phone_number: isCustomer(user) ? user.phone_number : "",
    },
  });

  async function onSubmit(data: TPersonalInfoEditPhoneNumberForm) {
    console.log(data);
  }

  return (
    <Stack
      component="form"
      autoComplete="off"
      noValidate
      spacing={2}
      onSubmit={handleSubmit(onSubmit)}
    >
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

      {isDirty && (
        <Button
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          loadingIndicator="Editing..."
          variant="contained"
        >
          Edit phone number
        </Button>
      )}
    </Stack>
  );
}
