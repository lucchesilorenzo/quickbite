import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { useNotifications } from "@toolpad/core/useNotifications";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import FormHelperTextError from "./FormHelperTextError";

import { useAddress } from "@/contexts/AddressProvider";
import env from "@/lib/env";
import { generateSlug } from "@/lib/utils/formatting";
import { Address } from "@/types/address-types";
import {
  TEditLocationFormSchema,
  editLocationFormSchema,
} from "@/validations/location-validations";

type EditLocationFormProps = {
  onCloseDialogs: () => void;
};

export default function EditLocationForm({
  onCloseDialogs,
}: EditLocationFormProps) {
  const { currentAddress, setCurrentAddress } = useAddress();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(editLocationFormSchema),
    defaultValues: {
      house_number: undefined,
    },
  });

  const navigate = useNavigate();
  const notifications = useNotifications();

  async function onSubmit(data: TEditLocationFormSchema) {
    onCloseDialogs();

    if (!currentAddress) return;

    const updatedDisplayName = `${data.house_number}, ${currentAddress.display_name}`;

    try {
      const { data: address } = await axios.get<Address[]>(
        `https://eu1.locationiq.com/v1/autocomplete?key=${env.VITE_LOCATIONIQ_API_KEY}&q=${updatedDisplayName}&format=json&normalizeaddress=1&countrycodes=IT`,
      );

      setCurrentAddress(address[0]);
      navigate(
        `/area/${generateSlug(address[0].display_name)}?lat=${address[0].lat}&lon=${address[0].lon}`,
      );
    } catch {
      notifications.show("There was an error fetching your location.", {
        key: "geolocation-error",
        severity: "error",
      });
    }
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
