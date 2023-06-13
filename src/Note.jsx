import { Link } from "react-router-dom";
import { useNote } from "./NoteLayout";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export function Note() {
  const note = useNote();

  return (
    <>
      <nav className="mb-5 flex items-center justify-between">
        <div className="flex flex-col items-start gap-2">
          <h1>{note.title}</h1>
          <div className="flex flex-wrap justify-center gap-1">
            {note.tags.length > 0 &&
              note.tags.map((tag) => {
                return (
                  <span
                    key={tag.id}
                    className="block rounded-md bg-blue-500 px-2 py-1 text-sm text-white"
                  >
                    {tag.label}
                  </span>
                );
              })}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to={`/${note.id}/edit`}>
            <button
              type="button"
              className="rounded-lg border border-blue-500 bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
            >
              Edit
            </button>
          </Link>
          <button
            type="button"
            className="rounded-lg border border-red-500 p-2 text-red-500 transition-colors hover:bg-red-500 hover:text-white"
          >
            Delete
          </button>
          <Link to="/">
            <button
              type="button"
              className="rounded-lg border border-gray-500 p-2 text-gray-500 transition-colors hover:bg-gray-500 hover:text-white"
            >
              Back
            </button>
          </Link>
        </div>
      </nav>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  );
}
