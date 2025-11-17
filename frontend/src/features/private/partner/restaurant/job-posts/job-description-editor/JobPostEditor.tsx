import { useRef } from "react";

import { Box } from "@mui/material";
import CharacterCount from "@tiptap/extension-character-count";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonEditLink,
  MenuButtonItalic,
  MenuButtonOrderedList,
  MenuButtonRedo,
  MenuButtonUndo,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  MenuSelectTextAlign,
  RichTextEditor,
  type RichTextEditorRef,
} from "mui-tiptap";

import CharacterCountDisplay from "./CharacterCountDisplay";

type JobPostEditorProps = {
  value: string;
  descriptionError?: string;
  onChange: ({ html, text }: { html: string; text: string }) => void;
};

export default function JobPostEditor({
  value,
  descriptionError,
  onChange,
}: JobPostEditorProps) {
  const rteRef = useRef<RichTextEditorRef>(null);

  return (
    <Box>
      <RichTextEditor
        ref={rteRef}
        extensions={[
          StarterKit,
          TextAlign.configure({
            types: ["heading", "paragraph"],
            defaultAlignment: "left",
          }),
          CharacterCount.configure({ limit: 2000 }),
        ]}
        content={value}
        onUpdate={({ editor }) => {
          onChange({
            html: editor.getHTML(),
            text: editor.getText().trim(),
          });
        }}
        renderControls={() => (
          <MenuControlsContainer>
            <MenuSelectHeading />

            <MenuDivider />

            <MenuButtonBold />
            <MenuButtonItalic />

            <MenuDivider />

            <MenuButtonEditLink />

            <MenuDivider />

            <MenuSelectTextAlign />

            <MenuDivider />

            <MenuButtonOrderedList />
            <MenuButtonBulletedList />

            <MenuDivider />

            <MenuButtonUndo />
            <MenuButtonRedo />
          </MenuControlsContainer>
        )}
      />

      <CharacterCountDisplay
        descriptionError={descriptionError}
        rteRef={rteRef}
      />
    </Box>
  );
}
