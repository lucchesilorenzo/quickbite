import { zodResolver } from "@hookform/resolvers/zod";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import {
  TAddressSearchForm,
  addressSearchForm,
} from "@/validations/address-search-validations";

export default function AddressSearchForm() {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isLoading },
  } = useForm<TAddressSearchForm>({
    resolver: zodResolver(addressSearchForm),
    defaultValues: {
      address: "",
    },
  });

  async function onSubmit(data: TAddressSearchForm) {
    console.log(data);
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ position: "relative" }}
    >
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Complete address"
            error={!!errors.address}
            helperText={errors.address?.message}
            margin="normal"
            disabled={isLoading}
            autoComplete="off"
            fullWidth
          />
        )}
      />

      {watch("address") && (
        <IconButton
          sx={{ position: "absolute", top: 25, right: 110 }}
          color="inherit"
          onClick={() => setValue("address", "")}
        >
          <HighlightOffIcon />
        </IconButton>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        sx={{ position: "absolute", top: 25, right: 10 }}
        variant="contained"
      >
        Search
      </Button>
    </Box>
  );
}
