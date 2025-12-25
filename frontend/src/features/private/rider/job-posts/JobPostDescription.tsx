import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import { RichTextReadOnly } from "mui-tiptap";

type JobPostDescriptionProps = {
  description?: string;
};

export default function JobPostDescription({
  description,
}: JobPostDescriptionProps) {
  return (
    <RichTextReadOnly
      editorProps={{
        attributes: {
          spellcheck: "false",
        },
      }}
      extensions={[
        StarterKit,
        TextAlign.configure({
          types: ["heading", "paragraph"],
          defaultAlignment: "left",
        }),
      ]}
      content={description}
    />
  );
}
