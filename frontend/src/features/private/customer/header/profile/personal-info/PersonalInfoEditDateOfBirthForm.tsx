import { useUpdatePersonalInfo } from "@customer/hooks/profile/useUpdatePersonalInfo";
import {
  TEditDateOfBirthFormSchema,
  editDateOfBirthFormSchema,
} from "@customer/schemas/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format, parseISO } from "date-fns";
import { Controller, useForm } from "react-hook-form";

import FormHelperTextError from "@/components/common/FormHelperTextError";
import { useAuth } from "@/contexts/AuthProvider";

export default function PersonalInfoEditDateOfBirthForm() {
  const { user } = useAuth();

  const { mutateAsync: updateCustomerDateOfBirth } = useUpdatePersonalInfo();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({
    resolver: zodResolver(editDateOfBirthFormSchema),
    defaultValues: {
      date_of_birth: user?.date_of_birth || "",
    },
  });

  async function onSubmit(data: TEditDateOfBirthFormSchema) {
    await updateCustomerDateOfBirth(data);
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
        name="date_of_birth"
        control={control}
        render={({ field }) => (
          <DatePicker
            minDate={new Date("1900-01-01")}
            maxDate={new Date()}
            format="dd/MM/yyyy"
            label="Date of birth"
            value={field.value ? parseISO(field.value) : null}
            onChange={(date: Date | null) =>
              field.onChange(date ? format(date, "yyyy-MM-dd") : "")
            }
            slotProps={{
              textField: {
                required: true,
                error: !!errors.date_of_birth,
                helperText: errors.date_of_birth?.message && (
                  <FormHelperTextError message={errors.date_of_birth.message} />
                ),
                fullWidth: true,
                sx: { minWidth: 150 },
              },
              field: { clearable: true },
            }}
          />
        )}
      />

      {isDirty && (
        <Button
          type="submit"
          loading={isSubmitting}
          loadingIndicator="Editing..."
          variant="contained"
        >
          Edit date of birth
        </Button>
      )}
    </Stack>
  );
}
