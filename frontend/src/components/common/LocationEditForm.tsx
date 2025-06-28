import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { FormHelperTextError } from "./FormHelperTextError";

import { useAddress } from "@/hooks/contexts/useAddress";
import { generateSlug } from "@/lib/utils";
import {
  TLocationEditForm,
  locationEditForm,
} from "@/validations/location-validations";

type LocationEditFormProps = {
  onCloseDialog: () => void;
};

export default function LocationEditForm({
  onCloseDialog,
}: LocationEditFormProps) {
  const { currentAddress, setCurrentAddress } = useAddress();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(locationEditForm),
    defaultValues: {
      house_number: undefined,
    },
  });

  const navigate = useNavigate();

  async function onSubmit(data: TLocationEditForm) {
    onCloseDialog();

    if (!currentAddress) return;

    const updatedAddress = {
      ...currentAddress,
      address: {
        ...currentAddress.address,
        house_number: String(data.house_number),
      },
      display_name: `${data.house_number}, ${currentAddress.display_name}`,
    };

    setCurrentAddress(updatedAddress);
    navigate(`/area/${generateSlug(updatedAddress.display_name)}`);
  }

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
      <TextField
        {...register("house_number")}
        autoFocus
        id="house-number"
        label="Insert house number"
        variant="standard"
        error={!!errors.house_number}
        helperText={
          errors.house_number?.message && (
            <FormHelperTextError message={errors.house_number.message} />
          )
        }
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isSubmitting}
        loading={isSubmitting}
        loadingIndicator="Confirming address..."
      >
        Confirm address
      </Button>
    </Stack>
  );
}
