export default function PageLoading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"
          role="status"
          aria-label="Memuat"
        />
        <p className="text-gray-400 text-sm">Memuat halaman...</p>
      </div>
    </div>
  );
}
