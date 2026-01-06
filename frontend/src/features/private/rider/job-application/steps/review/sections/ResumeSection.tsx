import DescriptionIcon from "@mui/icons-material/Description";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { TJobApplicationFormSchema } from "@rider/schemas/job-applications.schema";
import { useFormContext, useWatch } from "react-hook-form";

import ResumePreview from "../../resume/ResumePreview";

type ResumeSectionProps = {
  onBack: (step: number) => void;
};

export default function ResumeSection({ onBack }: ResumeSectionProps) {
  const { control } = useFormContext<TJobApplicationFormSchema>();

  const resume = useWatch({ control, name: "resume" });
  const file = resume instanceof FileList ? resume[0] : undefined;

  function handleDownload(file?: File) {
    if (!file) return;

    const link = document.createElement("a");
    const url = URL.createObjectURL(file);

    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

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
          Resume
        </Typography>

        <Box>
          <Button
            disabled={!file}
            onClick={() => handleDownload(file)}
            variant="text"
            sx={{ fontWeight: 500, textTransform: "none" }}
          >
            Download
          </Button>

          <Button
            onClick={() => onBack(1)}
            variant="text"
            sx={{ fontWeight: 500, textTransform: "none" }}
          >
            Edit
          </Button>
        </Box>
      </Stack>

      {file && (
        <Card variant="outlined" sx={{ p: 2 }}>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <DescriptionIcon color="inherit" />

            <Box>
              <Button
                onClick={() => handleDownload(file)}
                variant="text"
                sx={{ fontWeight: 500, textTransform: "none", p: 0 }}
              >
                {file.name}
              </Button>

              <Typography variant="body2" color="textSecondary">
                Just uploaded
              </Typography>
            </Box>
          </Stack>

          <ResumePreview />
        </Card>
      )}
    </Box>
  );
}
