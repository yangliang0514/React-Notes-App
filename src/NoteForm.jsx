export default function NoteForm() {
  return (
    <>
      <form>
        <div className="flex w-full gap-3">
          <div className="flex flex-col gap-3 grow">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="border-2 border-slate-500 rounded-md px-2 py-1"
              id="title"
            />
          </div>
          <div className="flex flex-col gap-3 grow">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              className="border-2 border-slate-500 rounded-md px-2 py-1"
              id="tags"
            />
          </div>
        </div>
      </form>
    </>
  );
}
