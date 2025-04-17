import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  TLocationFormSchema,
  locationFormSchema,
} from "@/validations/location-validations";

export default function LocationForm() {
  const [cookies, setCookie] = useCookies(["address"]);
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      house_number: undefined,
    },
  });

  const navigate = useNavigate();

  async function onSubmit(data: TLocationFormSchema) {
    const currentAddress = cookies.address;

    const updatedAddress = {
      ...currentAddress,
      address: {
        ...currentAddress.address,
        house_number: data.house_number,
      },
    };

    setCookie("address", updatedAddress);

    if (!updatedAddress.address.postcode) {
      navigate(`/area/${updatedAddress.address.name}`);
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
