import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { FormHelperTextError } from "./FormHelperTextError";

import {
  TEditLocationForm,
  editLocationForm,
} from "@/validations/location-validations";

type EditLocationFormProps = {
  onCloseDialog: () => void;
};

export default function EditLocationForm({
  onCloseDialog,
}: EditLocationFormProps) {
  const [cookies, setCookie] = useCookies(["address"]);
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(editLocationForm),
    defaultValues: {
      house_number: undefined,
    },
  });

  const navigate = useNavigate();

  async function onSubmit(data: TEditLocationForm) {
    onCloseDialog();

    const currentAddress = cookies.address;

    const updatedAddress = {
      ...currentAddress,
      address: {
        ...currentAddress.address,
        house_number: data.house_number,
      },
      display_name: `${cookies.address.address.name || cookies.address.address.road}, ${data.house_number}, ${cookies.address.address.postcode} ${cookies.address.address.city}`,
    };

    setCookie("address", updatedAddress);

    if (!updatedAddress.address.postcode) {
      navigate(`/area/${updatedAddress.address.name}`);
      return;
    }

    navigate(
      `/area/${updatedAddress.address.postcode}-${updatedAddress.address.city}`,
    );
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
