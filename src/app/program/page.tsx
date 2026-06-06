export default function ProgramPage() {
  const programs = [
    {
      title: "Riset & Dokumentasi Biodiversitas",
      description:
        "Eksplorasi, penelitian, dan dokumentasi ikan asli Indonesia sebagai dasar ilmu pengetahuan dan konservasi.",
      points: [
        "Survei dan eksplorasi ikan air tawar",
        "Identifikasi spesies",
        "Riset taksonomi dan genetik",
        "Pemetaan distribusi",
      ],
    },
    {
      title: "Konservasi Habitat Perairan",
      description:
        "Melindungi ekosistem perairan dan habitat penting ikan asli Indonesia melalui aksi konservasi berbasis sains.",
      points: [
        "Konservasi in-situ",
        "Monitoring habitat",
        "Restorasi ekosistem",
        "Perlindungan spesies",
      ],
    },
    {
      title: "Edukasi Masyarakat",
      description:
        "Meningkatkan kesadaran dan kapasitas masyarakat dalam menjaga biodiversitas perairan Indonesia.",
      points: [
        "Edukasi lingkungan",
        "Pelatihan masyarakat",
        "Citizen science",
        "Penyadartahuan konservasi",
      ],
    },
    {
      title: "Database Ikan Asli Indonesia",
      description:
        "Mengembangkan basis data digital biodiversitas ikan Indonesia yang terbuka dan mudah diakses.",
      points: [
        "Data spesies",
        "Distribusi habitat",
        "Arsip visual",
        "Referensi ilmiah",
      ],
    },
    {
      title: "Pengembangan Perikanan Berkelanjutan",
      description:
        "Mendukung pengelolaan perairan yang berkelanjutan melalui pendekatan berbasis komunitas.",
      points: [
        "Budidaya ikan lokal",
        "Pendampingan komunitas",
        "Pengelolaan perairan",
        "Ekonomi biru",
      ],
    },
  ];

  return (
    <main className="bg-black text-white min-h-screen">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-yellow-400 uppercase tracking-[0.2em] text-sm">
              Program Kami
            </span>

            <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6">
              FFOI PROGRAM
            </h1>

            <p className="text-gray-300 leading-relaxed">
              FFOI menjalankan berbagai program penelitian, konservasi,
              edukasi, dan pengembangan perairan berkelanjutan untuk
              mendukung perlindungan ikan asli Indonesia.
            </p>
          </div>

          {/* Placeholder Banner */}
          <div className="h-[320px] rounded-3xl bg-zinc-900 border border-dashed border-yellow-400/30 flex items-center justify-center">
            <span className="text-gray-500">
              Banner Program
            </span>
          </div>
        </div>
      </section>

      {/* VALUE */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-yellow-400 font-bold text-lg mb-2">
              Berbasis Sains
            </h3>

            <p className="text-gray-400">
              Pendekatan ilmiah dalam setiap program.
            </p>
          </div>

          <div>
            <h3 className="text-yellow-400 font-bold text-lg mb-2">
              Kolaboratif
            </h3>

            <p className="text-gray-400">
              Bersinergi bersama mitra dan komunitas.
            </p>
          </div>

          <div>
            <h3 className="text-yellow-400 font-bold text-lg mb-2">
              Berkelanjutan
            </h3>

            <p className="text-gray-400">
              Untuk kelestarian perairan Indonesia.
            </p>
          </div>

          <div>
            <h3 className="text-yellow-400 font-bold text-lg mb-2">
              Berdaya
            </h3>

            <p className="text-gray-400">
              Memberdayakan masyarakat lokal.
            </p>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="program"
      className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div
              key={program.title}
              className="overflow-hidden rounded-[2rem] border-2 border-yellow-400/40 bg-zinc-950 hover:border-yellow-400 transition"
            >
              {/* IMAGE PLACEHOLDER */}
              <div className="h-60 bg-zinc-900 flex items-center justify-center border-b border-yellow-400/20">
                <span className="text-gray-500">
                  Foto Program
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">
                  {program.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  {program.description}
                </p>

                <ul className="space-y-2 text-sm text-gray-300">
                  {program.points.map((point) => (
                    <li key={point}>
                      • {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= DAMPAK KAMI ================= */}
<section
  id="dampak-kami"
  className="border-t border-white/10 py-24"
>
  <div className="max-w-7xl mx-auto px-6 md:px-10">

    <h2 className="text-4xl md:text-6xl font-bold mb-6">
      DAMPAK KAMI
    </h2>

    <p className="text-gray-400 max-w-3xl leading-relaxed mb-12">
      Setiap langkah kecil yang kami lakukan di lapangan,
      setiap data yang kami kumpulkan, dan setiap kolaborasi
      yang terjalin memberikan dampak nyata bagi kelestarian
      ikan asli Indonesia dan ekosistem perairannya.
    </p>

    {/* Statistik */}
    <div className="grid md:grid-cols-5 gap-4 mb-20">
      {[
        ["25+", "Anggota Tim"],
        ["16+", "Lokasi Survei"],
        ["350+", "Spesies"],
        ["10+", "Publikasi"],
        ["30+", "Mitra"],
      ].map(([value, label]) => (
        <div
          key={label}
          className="border border-yellow-400/30 rounded-2xl p-5"
        >
          <h3 className="text-4xl font-bold text-yellow-400">
            {value}
          </h3>

          <p className="text-gray-400 text-sm mt-2">
            {label}
          </p>
        </div>
      ))}
    </div>

    {/* Dampak Lapangan */}
    <h3 className="text-3xl font-bold mb-10">
      Dampak Nyata di Lapangan
    </h3>

    <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6 mb-20">

      {[
        "Perlindungan Habitat",
        "Pelestarian Ikan Asli",
        "Edukasi dan Kesadaran",
        "Pemberdayaan Masyarakat",
        "Data Untuk Masa Depan",
      ].map((item) => (
        <div
          key={item}
          className="border border-yellow-400/30 rounded-2xl overflow-hidden bg-zinc-950"
        >
          <div className="h-48 bg-zinc-900 flex items-center justify-center">
            <span className="text-gray-500">
              Foto
            </span>
          </div>

          <div className="p-5">
            <h4 className="font-bold mb-3">
              {item}
            </h4>

            <p className="text-sm text-gray-400">
              Deskripsi singkat mengenai dampak
              program terhadap konservasi dan
              masyarakat.
            </p>
          </div>
        </div>
      ))}

    </div>

    {/* Tujuan + Quote */}
    <div className="grid lg:grid-cols-2 gap-16">

      <div>
        <h3 className="text-3xl font-bold mb-4 text-yellow-400">
          Tujuan Kami
        </h3>

        <p className="text-gray-300 leading-relaxed">
          Menciptakan masa depan di mana
          keanekaragaman hayati perairan Indonesia
          tetap lestari, didukung oleh ilmu
          pengetahuan, kolaborasi, dan kepedulian
          bersama.
        </p>
      </div>

      <div>
        <blockquote className="text-2xl italic text-gray-200 leading-relaxed">
          “Kami percaya, melindungi ikan asli
          Indonesia berarti menjaga kehidupan,
          budaya, dan masa depan generasi
          mendatang.”
        </blockquote>
      </div>

    </div>

  </div>
</section>

    </main>
  );
}

