import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select/creatable";

export default function NoteList({ availableTags, notes }) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [title, setTitle] = useState("");

  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            notes.tag.some((noteTag) => noteTag.id === tag.id)
          ))
    );
  }, [title, selectedTags, notes]);

  return (
    <>
      <nav className="flex justify-between mb-5 items-center">
        <h1>Notes</h1>
        <div className="flex gap-2 items-center">
          <Link to={"/new"}>
            <button
              type="button"
              className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors border border-blue-400"
            >
              Create
            </button>
          </Link>
          <button
            type="button"
            className="p-2 border border-gray-500 rounded-lg text-gray-500 hover:text-white hover:bg-gray-500 transition-colors"
          >
            Edit Tags
          </button>
        </div>
      </nav>
      <form action="">
        <div className="flex w-full gap-3">
          <label htmlFor="title" className="flex flex-col gap-3 grow">
            Title
            <input
              type="text"
              className="border border-slate-300 rounded-md px-2 py-1 h-10"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="tags" className="flex flex-col gap-3 grow">
            Tags
            <ReactSelect
              isMulti
              value={selectedTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              options={availableTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })
                );
              }}
            />
          </label>
        </div>
      </form>
      <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredNotes.map((note) => (
          <NoteCard id={note.id} title={note.title} tags={note.tags} />
        ))}
      </div>
    </>
  );
}

function NoteCard({ id, title, tasg }) {
  return "";
}
