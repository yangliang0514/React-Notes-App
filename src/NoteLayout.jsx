import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";

export function NoteLayout({ notes }) {
  const { id } = useParams();
  const note = notes.find((note) => note.id === id);

  // If the id doesn't exist, navigate to the home page
  if (!note) return <Navigate to="/" />;

  // Will render out whatever is inside this componenet, which is all the components in App.jsx
  return <Outlet context={note} />;
}

export function useNote() {
  return useOutletContext();
}
