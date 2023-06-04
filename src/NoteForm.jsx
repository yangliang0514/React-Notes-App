export default function NoteForm() {
  return (
    <>
      <form>
        <div className="flex w-full gap-3">
          <label htmlFor="title" className="flex flex-col gap-3 grow">
            Title
            <input
              type="text"
              className="border-2 border-slate-400 rounded-md px-2 py-1"
              id="title"
            />
          </label>
          <label htmlFor="tags" className="flex flex-col gap-3 grow">
            Tags
            <input
              type="text"
              className="border-2 border-slate-400 rounded-md px-2 py-1"
              id="tags"
            />
          </label>
        </div>
      </form>
    </>
  );
}
