import { useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select/creatable";

export default function NoteList({ availableTags }) {
  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <>
      <nav className="flex justify-between mb-5">
        <h1>Notes</h1>
        <div className="flex gap-2">
          <Link to={"/new"}>
            <button
              type="button"
              className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
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
    </>
  );
}
