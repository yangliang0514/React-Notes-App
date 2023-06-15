import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select/creatable";

export default function NoteList({ availableTags, notes }) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [title, setTitle] = useState("");

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <nav className="mb-5 flex items-center justify-between">
        <h1>Notes</h1>
        <div className="flex items-center gap-2">
          <Link to={"/new"}>
            <button
              type="button"
              className="rounded-lg border border-blue-500 bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
            >
              Create
            </button>
          </Link>
          <button
            type="button"
            className="rounded-lg border border-gray-500 p-2 text-gray-500 transition-colors hover:bg-gray-500 hover:text-white"
          >
            Edit Tags
          </button>
        </div>
      </nav>
      <form action="">
        <div className="flex w-full gap-3">
          <label htmlFor="title" className="flex w-1/2 flex-col gap-3">
            Title
            <input
              type="text"
              className="h-10 rounded-md border border-slate-300 px-2 py-1"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="tags" className="flex w-1/2 flex-col gap-3">
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
      <div className="grid-col-1 mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredNotes.map((note) => {
          return (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              tags={note.tags}
            />
          );
        })}
      </div>
      <EditTagsModal />
    </>
  );
}

function NoteCard({ id, title, tags }) {
  return (
    <Link to={`/${id}`}>
      <div className="relative flex h-full w-full flex-col gap-5 rounded-md border border-gray-300 p-5 transition-all hover:-translate-y-1 hover:shadow-lg">
        <span className="block text-center text-2xl">{title}</span>
        <div className="flex flex-wrap justify-center gap-1">
          {tags.length > 0 &&
            tags.map((tag) => {
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
    </Link>
  );
}

function EditTagsModal() {
  return (
    <div class="fixed left-0 top-0 hidden h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
      <div class="max-h-full w-full max-w-xl overflow-y-auto bg-white sm:rounded-2xl">
        <div class="w-full">
          <div class="m-8 mx-auto my-20 max-w-[400px]">
            <div class="mb-8">
              <h1 class="mb-4 text-3xl font-extrabold">
                Turn on notifications
              </h1>
              <p class="text-gray-600">
                Get the most out of Twitter by staying up to date with what's
                happening.
              </p>
            </div>
            <div class="space-y-4">
              <button class="w-full rounded-full bg-black p-3 font-semibold text-white">
                Allow notifications
              </button>
              <button class="w-full rounded-full border bg-white p-3 font-semibold">
                Skip for now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
