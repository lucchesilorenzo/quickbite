import { Stack, Typography } from "@mui/material";
import { RichTextEditorRef } from "mui-tiptap";

import FormHelperTextError from "@/components/common/FormHelperTextError";

type CharacterCountDisplayProps = {
  descriptionError?: string;
  rteRef: React.RefObject<RichTextEditorRef | null>;
};

export default function CharacterCountDisplay({
  descriptionError,
  rteRef,
}: CharacterCountDisplayProps) {
  return (
    <Stack direction="row" sx={{ mt: 1, justifyContent: "space-between" }}>
      {descriptionError ? (
        <FormHelperTextError message={descriptionError} />
      ) : (
        <Typography sx={{ visibility: "hidden" }}></Typography>
      )}

      <Typography variant="body2">
        {rteRef.current?.editor?.storage.characterCount.characters() ?? 0} /
        2000
      </Typography>
    </Stack>
  );
}
