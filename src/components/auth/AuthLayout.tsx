import Link from "next/link";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function AuthLayout({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <main className="min-h-screen bg-black">
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="w-full border-b border-yellow-500/10">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition"
            >
              <span>←</span>
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            {/* Logo */}
            <Link
              href="/"
              className="flex flex-col items-center mb-8"
            >
              <img
                src="/logo/Logo FFOI Transparan.png"
                alt="FFOI"
                className="w-24 h-24 object-contain mb-4"
              />

              <h1 className="text-white text-3xl font-bold">
                FFOI
              </h1>

              <p className="text-yellow-400 text-sm text-center mt-1">
                Freshwater Fish of Indonesia
              </p>
            </Link>

            {/* Card */}
            <div
              className="bg-neutral-900 border border-yellow-500/10 rounded-2xl p-8 shadow-2xl"
            >
              <h2 className="text-white text-3xl font-bold text-center">
                {title}
              </h2>

              {subtitle && (
                <p className="text-gray-400 text-center mt-2 mb-6">
                  {subtitle}
                </p>
              )}

              {children}
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                Database • Konservasi • Penelitian
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}