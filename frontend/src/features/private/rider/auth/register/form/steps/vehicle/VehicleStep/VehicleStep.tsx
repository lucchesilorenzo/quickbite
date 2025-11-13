import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MopedIcon from "@mui/icons-material/Moped";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { TRegisterFormSchema } from "@rider/validations/auth-validations";
import { Controller, useFormContext } from "react-hook-form";

import FormHelperTextError from "@/components/common/FormHelperTextError";

const vehicles = [
  { label: "Own Scooter", value: "scooter", icon: MopedIcon },
  { label: "Own Car", value: "car", icon: DirectionsCarIcon },
];

export default function VehicleStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<TRegisterFormSchema>();

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", fontWeight: 600, mb: 3 }}
      >
        Choose the vehicle you would like to use
      </Typography>

      <Controller
        name="vehicle_type"
        control={control}
        render={({ field }) => (
          <Box>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              {vehicles.map((vehicle) => {
                const selected = field.value === vehicle.value;

                return (
                  <Card
                    key={vehicle.value}
                    variant="outlined"
                    sx={{
                      flex: 1,
                      borderColor: selected ? "primary.main" : grey[400],
                      bgcolor: selected ? grey[100] : "",
                    }}
                  >
                    <CardActionArea
                      aria-pressed={selected}
                      onClick={() => field.onChange(vehicle.value)}
                    >
                      <CardContent>
                        <Stack
                          direction="row"
                          sx={{
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="h6">{vehicle.label}</Typography>

                          <vehicle.icon
                            fontSize="large"
                            color={selected ? "primary" : "action"}
                          />
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                );
              })}
            </Stack>

            {errors.vehicle_type?.message && (
              <Stack sx={{ alignItems: "center", mt: 1 }}>
                <FormHelperTextError message={errors.vehicle_type.message} />
              </Stack>
            )}
          </Box>
        )}
      />

      <Stack spacing={3} sx={{ textAlign: "center", mt: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Vehicles
        </Typography>

        <Typography variant="body2" sx={{ textDecoration: "underline" }}>
          If your vehicle does not appear as an option, it means we are
          currently not recruiting riders for that type of vehicle in your area.
        </Typography>

        <Typography variant="body2">
          If the option "My vehicle" is available for this city and you have the
          intention of selecting it, ensure that your vehicle is robust and can
          withstand multiple trips and deliveries. Your safety is the top
          priority: your vehicle must be able to sustain the weight and force
          necessary to transport orders and provide the necessary power to
          overcome obstacles.
        </Typography>
      </Stack>
    </Box>
  );
}
