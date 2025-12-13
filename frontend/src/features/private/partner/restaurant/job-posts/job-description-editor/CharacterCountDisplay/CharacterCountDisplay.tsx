import { Stack, Typography } from "@mui/material";

import FormHelperTextError from "@/components/common/FormHelperTextError";

type CharacterCountDisplayProps = {
  descriptionError?: string;
  characterCount: number;
};

export default function CharacterCountDisplay({
  descriptionError,
  characterCount,
}: CharacterCountDisplayProps) {
  return (
    <Stack direction="row" sx={{ mt: 1, justifyContent: "space-between" }}>
      {descriptionError ? (
        <FormHelperTextError message={descriptionError} />
      ) : (
        <Typography sx={{ visibility: "hidden" }}></Typography>
      )}

      <Typography variant="body2">{characterCount} / 2000</Typography>
    </Stack>
  );
}
