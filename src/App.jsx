import { useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "./useLocalStorage";
import NewNote from "./NewNote";
import NoteList from "./NoteList";
import { NoteLayout, useNote } from "./NoteLayout";
import { Note } from "./Note";
import EditNote from "./EditNote";

export default function App() {
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [tags, setTags] = useLocalStorage("tags", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote(noteData) {
    setNotes((prev) => {
      return [
        ...prev,
        {
          title: noteData.title,
          markdown: noteData.markdown,
          id: uuidV4(),
          tagIds: tags.map((tag) => tag.id),
        },
      ];
    });
  }

  function onUpdateNote(id, { tags, ...data }) {
    setNotes((prev) => {
      return prev.map((note) => {
        if (note.id === id)
          return {
            ...note,
            ...data,
            tagIds: tags.map((tag) => tag.id),
          };

        return note;
      });
    });
  }

  function onDeleteNote(id) {
    setNotes((prev) => {
      return prev.filter((note) => note.id !== id);
    });
  }

  function addTag(tag) {
    setTags((prev) => [...prev, tag]);
  }

  return (
    <main className="p-4">
      <Routes>
        <Route
          path="/"
          element={<NoteList availableTags={tags} notes={notesWithTags} />}
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}
