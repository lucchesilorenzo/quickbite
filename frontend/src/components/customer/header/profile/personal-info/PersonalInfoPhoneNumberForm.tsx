import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { Controller, useForm } from "react-hook-form";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import { useAuth } from "@/hooks/contexts/public/useAuth";
import { useUpdatePersonalInfo } from "@/hooks/react-query/private/customer/profile/useUpdatePersonalInfo";
import {
  TEditPhoneNumberFormSchema,
  editPhoneNumberFormSchema,
} from "@/validations/private/customer/profile-validations";

export default function PersonalInfoEditPhoneNumberForm() {
  const { user } = useAuth();
  const { mutateAsync: updateCustomerPhoneNumber } = useUpdatePersonalInfo();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({
    resolver: zodResolver(editPhoneNumberFormSchema),
    defaultValues: {
      phone_number: user?.phone_number || "",
    },
  });

  async function onSubmit(data: TEditPhoneNumberFormSchema) {
    await updateCustomerPhoneNumber(data);
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
