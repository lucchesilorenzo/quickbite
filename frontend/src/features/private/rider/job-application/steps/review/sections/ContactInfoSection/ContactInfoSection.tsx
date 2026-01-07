import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";
import { TJobApplicationFormSchema } from "@rider/schemas/job-applications.schema";
import { useFormContext } from "react-hook-form";

type ContactInfoSectionProps = {
  onBack: (step: number) => void;
};

export default function ContactInfoSection({
  onBack,
}: ContactInfoSectionProps) {
  const { getValues } = useFormContext<TJobApplicationFormSchema>();

  const firstName = getValues("first_name");
  const lastName = getValues("last_name");
  const email = getValues("email");
  const phoneNumber = getValues("phone_number");

  return (
    <Box component="section">
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between", mb: 1 }}
      >
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ fontWeight: 500 }}
        >
          Contact information
        </Typography>

        <Button
          onClick={() => onBack(2)}
          variant="text"
          sx={{ fontWeight: 500, textTransform: "none" }}
        >
          Edit
        </Button>
      </Stack>

      <Card variant="outlined" sx={{ p: 2 }}>
        <Box>
          <Typography variant="body2" gutterBottom>
            Full name
          </Typography>

          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {firstName} {lastName}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="body2" gutterBottom>
            Email
          </Typography>

          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {email}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="body2" gutterBottom>
            Phone number
          </Typography>

          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {phoneNumber}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
