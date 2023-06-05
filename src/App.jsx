import { Routes, Route, Navigate } from "react-router-dom";
import NewNote from "./NewNote";
import useLocalStorage from "./useLocalStorage";
import { useMemo } from "react";

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

  return (
    <main className="container m-4">
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/new" element={<NewNote />} />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}
