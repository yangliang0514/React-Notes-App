import { Routes, Route, Navigate } from "react-router-dom";
import NewNote from "./NewNote";
import useLocalStorage from "./useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";

export default function App() {
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [tags, setTags] = useLocalStorage("tags", []);
  const notesWithTage = useMemo(() => {
    return notes.map((note) => {
      return {
        ...notes,
        tags: tags.filter((tag) => note.tagIds.include(tag.id)),
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

  function addTag(tag) {
    setTags((prev) => [...prev, tag]);
  }

  return (
    <main className="container m-4">
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
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
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}
