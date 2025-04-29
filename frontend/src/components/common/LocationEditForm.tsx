import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
  const [cookies, setCookie] = useCookies(["address"]);
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
        helperText={errors.house_number?.message}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        loading={isSubmitting}
      >
        Confirm address
      </Button>
    </Stack>
  );
}
