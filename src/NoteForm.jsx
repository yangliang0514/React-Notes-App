import { useRef } from "react";
import { Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";

export default function NoteForm() {
  const titleRef = useRef(null);
  const markdownRef = useRef(null);

  function submitForm(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={submitForm}>
      <div className="flex w-full gap-3">
        <label htmlFor="title" className="flex flex-col gap-3 grow">
          Title
          <input
            ref={titleRef}
            type="text"
            className="border border-slate-300 rounded-md px-2 py-1"
            id="title"
            required
          />
        </label>
        <label htmlFor="tags" className="flex flex-col gap-3 grow">
          Tags
          <CreatableSelect isMulti required />
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
          className="border border-slate-300 rounded-md px-1 py-1 w-full"
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
