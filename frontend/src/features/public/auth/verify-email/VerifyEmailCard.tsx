import { Button, Paper, Stack, Typography } from "@mui/material";

import { useAuth } from "@/contexts/AuthProvider";
import { useEmailVerification } from "@/hooks/auth/useEmailVerification";

export default function VerifyEmailCard() {
  const { user } = useAuth();
  const { mutate: sendVerification, isPending: isVerifying } =
    useEmailVerification();

  function handleSendEmailVerification() {
    sendVerification();
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      <Stack spacing={2}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Verify your email
        </Typography>

        <Typography>
          A verification email has been sent to{" "}
          <Typography component="span" sx={{ fontWeight: 600 }}>
            {user?.email}
          </Typography>
          . Please check your inbox and click the link to activate your account.
        </Typography>

        <Typography>
          Didn't receive the email? Make sure to check your Junk/Spam folder.
        </Typography>

        <Typography>
          You can also resend the verification email if needed.
        </Typography>

        <Button
          loading={isVerifying}
          loadingIndicator="Sending..."
          variant="contained"
          color="primary"
          onClick={handleSendEmailVerification}
        >
          Resend
        </Button>
      </Stack>
    </Paper>
  );
}
