interface Props {
  page: number;
  totalPages: number;

  setPage: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  setPage,
}: Props) {
  return (
    <div className="flex justify-center items-center gap-3 mt-8">

      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-4 py-2 border rounded"
      >
        Prev
      </button>

      <span>
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-4 py-2 border rounded"
      >
        Next
      </button>

    </div>
  );
}