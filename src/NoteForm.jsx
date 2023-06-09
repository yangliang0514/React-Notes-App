import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";

export default function NoteForm({ onSubmit, onAddTag, availableTags }) {
  const titleRef = useRef(null);
  const markdownRef = useRef(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current.value,
      markdown: markdownRef.current.value,
      tags: selectedTags,
    });

    navigate("..");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-full gap-3">
        <label htmlFor="title" className="flex flex-col gap-3 w-1/2">
          Title
          <input
            ref={titleRef}
            type="text"
            className="border border-slate-300 rounded-md px-2 py-1 h-10"
            id="title"
            required
          />
        </label>
        <label htmlFor="tags" className="flex flex-col gap-3 w-1/2">
          Tags
          <CreatableSelect
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
            onCreateOption={(label) => {
              const newTag = { id: uuidV4(), label };
              onAddTag(newTag);
              setSelectedTags((prev) => [...prev, newTag]);
            }}
          />
        </label>
      </div>
      <div className="mt-5">
        <label htmlFor="mark-down" className="block">
          Body
        </label>
        <textarea
          ref={markdownRef}
          name=""
          id="mark-down"
          rows="15"
          className="border border-slate-300 rounded-md px-2 py-1 w-full"
          required
        ></textarea>
      </div>
      <div className="flex justify-end gap-2 mt-3">
        <button
          type="submit"
          className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
        >
          Save
        </button>
        <Link to="..">
          <button
            type="button"
            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
}
