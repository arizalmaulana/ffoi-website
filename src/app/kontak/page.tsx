  // import {
  //   Mail,
  //   Globe,
  //   MapPin,
  //   Instagram,
  //   Facebook,
  // } from "lucide-react";

export default function KontakPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-24">

        <span className="text-yellow-400 uppercase tracking-[0.2em] text-sm">
          Kontak
        </span>

        <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-8">
          Hubungi Kami
        </h1>

        <p className="text-gray-400 text-lg max-w-2xl leading-relaxed mb-20">
          Freshwater Fish of Indonesia (FFOI) terbuka untuk kolaborasi,
          penelitian, kemitraan, media, maupun berbagai inisiatif yang
          mendukung konservasi biodiversitas perairan Indonesia.
        </p>

        <div className="space-y-10">

          <div className="border-b border-white/10 pb-8">
            <div className="flex items-center gap-3 mb-3">
              {/* <Mail className="text-yellow-400" size={20} /> */}
              <h2 className="font-semibold text-xl">
                Email
              </h2>
            </div>

            <a
              href="mailto:freshwaterfishofindonesia@gmail.com"
              className="text-gray-300 hover:text-yellow-400 transition"
            >
              freshwaterfishofindonesia@gmail.com
            </a>
          </div>

          <div className="border-b border-white/10 pb-8">
            <div className="flex items-center gap-3 mb-3">
              {/* <Globe className="text-yellow-400" size={20} /> */}
              <h2 className="font-semibold text-xl">
                Website
              </h2>
            </div>

            <p className="text-gray-300">
              www.ffoi.or.id
            </p>
          </div>

          <div className="border-b border-white/10 pb-8">
            <div className="flex items-center gap-3 mb-3">
              {/* <MapPin className="text-yellow-400" size={20} /> */}
              <h2 className="font-semibold text-xl">
                Lokasi
              </h2>
            </div>

            <p className="text-gray-300">
              Indonesia
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-4">
              Media Sosial
            </h2>

            <div className="flex gap-6">
              <a
                href="https://www.instagram.com/freshwaterfishofindonesia"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <Instagram className="w-6 h-6 hover:text-yellow-400 transition" /> */}
              </a>

              <a
                href="https://www.facebook.com/share/1FMzGXXemk/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <Facebook className="w-6 h-6 hover:text-yellow-400 transition" /> */}
              </a>
            </div>
          </div>

        </div>

      </section>
    </main>
  );
}