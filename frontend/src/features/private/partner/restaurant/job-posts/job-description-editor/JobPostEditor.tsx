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
import { UseFormSetValue } from "react-hook-form";

import CharacterCountDisplay from "./CharacterCountDisplay";

type JobPostEditorProps = {
  value: string;
  descriptionError?: string;
  onChange: (value: string) => void;
  setValue: UseFormSetValue<any>;
};

export default function JobPostEditor({
  value,
  descriptionError,
  onChange,
  setValue,
}: JobPostEditorProps) {
  const rteRef = useRef<RichTextEditorRef>(null);

  return (
    <Box>
      <RichTextEditor
        editorProps={{
          attributes: {
            spellcheck: "false",
          },
        }}
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
          onChange(editor.getHTML());
          setValue("description_text", editor.getText().trim());
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
