import { Link } from "react-router-dom";

export default function NoteList() {
  return (
    <>
      <nav className="flex justify-between">
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
    </>
  );
}
