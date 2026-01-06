import { useMemo } from "react";

import { Box } from "@mui/material";
import { TJobApplicationFormSchema } from "@rider/schemas/job-applications.schema";
import { useFormContext, useWatch } from "react-hook-form";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function ResumePreview() {
  const { control } = useFormContext<TJobApplicationFormSchema>();

  const resume = useWatch({ control, name: "resume" });
  const file = resume instanceof FileList ? resume[0] : undefined;

  const url = useMemo(() => {
    if (!file || file.type !== "application/pdf") {
      return null;
    }

    return URL.createObjectURL(file);
  }, [file]);

  return (
    <Box
      sx={{
        border: url ? "1px solid #cccc" : "",
        borderRadius: url ? 1 : 0,
        overflowY: url ? "auto" : "",
        mb: 2,
      }}
    >
      <Document
        file={url}
        loading="Loading resume..."
        error="Unable to preview PDF."
        noData="No resume uploaded."
      >
        <Page pageNumber={1} width={500} />
      </Document>
    </Box>
  );
}
