import NoteForm from "./NoteForm";
import { useNote } from "./NoteLayout";

export default function EditNote({ onSubmit, onAddTag, availableTags }) {
  const note = useNote();
  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
