import { useState } from "react";

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
} from "mui-tiptap";
import { FieldValues, Path, UseFormSetValue } from "react-hook-form";

import CharacterCountDisplay from "./CharacterCountDisplay";

type JobPostEditorProps<TForm extends FieldValues> = {
  value: string;
  descriptionError?: string;
  onChange: (value: string) => void;
  setValue: UseFormSetValue<TForm>;
};

export default function JobPostEditor<TForm extends FieldValues>({
  value,
  descriptionError,
  onChange,
  setValue,
}: JobPostEditorProps<TForm>) {
  const [characterCount, setCharacterCount] = useState(0);

  return (
    <Box>
      <RichTextEditor
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
          CharacterCount.configure({ limit: 2000 }),
        ]}
        content={value}
        onUpdate={({ editor }) => {
          onChange(editor.getHTML());
          setValue(
            "description_text" as Path<TForm>,
            editor.getText().trim() as TForm[Path<TForm>],
          );
          setCharacterCount(editor.storage.characterCount.characters());
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
        characterCount={characterCount}
      />
    </Box>
  );
}
