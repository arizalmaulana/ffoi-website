const strukturTim = {
  pimpinan: [
    {
      nama: "Marcel A. Adis",
      jabatan: "Direktur Eksekutif",
      deskripsi: "Iktiologi dan Konservasi Perairan",
    },
  ],

  direktur: [
    {
      nama: "Leonardo Davinci",
      jabatan: "Direktur Riset dan Budidaya Ikan",
      deskripsi: "Riset Akuatik dan Budidaya Berkelanjutan",
    },
    {
      nama: "Adam P. Ardiyan",
      jabatan: "Direktur Konservasi dan Pengelolaan",
      deskripsi: "Konservasi Perairan dan Pengembangan Ekosistem",
    },
    {
      nama: "Guy F. Amrado Sitorus",
      jabatan: "Direktur Community Development dan Edukasi",
      deskripsi: "Edukasi Lingkungan dan Outreach Publik",
    },
    {
      nama: "Giovanni R. Putra",
      jabatan: "Direktur Kemitraan dan Kolaborasi",
      deskripsi: "Kemitraan Strategis dan Kolaborasi Konservasi",
    },
    {
      nama: "Yohanes Baptista",
      jabatan: "Direktur Keuangan dan Hibah",
      deskripsi: "Manajemen Keuangan dan Hibah",
    },
  ],

  koordinator: [
    {
      nama: "Timotius Arianto",
      jabatan: "Koordinator Eksplorasi Perairan",
      deskripsi: "Persebaran Ikan dan Eksplorasi Habitat",
    },
    {
      nama: "Resqi Pranadi",
      jabatan: "Koordinator Konservasi Lapangan",
      deskripsi: "Monitoring Habitat dan Konservasi Spesies",
    },
    {
      nama: "Ahsan A. Hidayat",
      jabatan: "Koordinator Dokumentasi dan Citizen Ichthyologist",
      deskripsi: "Dokumentasi Lapangan dan Citizen Ichthyologist",
    },
    {
      nama: "Fenny Syamsurizal",
      jabatan: "Koordinator Kemitraan dan Relasi Institusi",
      deskripsi: "Relasi Institusi dan Pengembangan Jaringan",
    },
    {
      nama: "Septi Antika",
      jabatan: "Administrasi",
      deskripsi: "Administrasi Organisasi dan Manajemen Operasional",
    },
  ],

  staf: [
    {
      nama: "Ahmad Syahrul",
      jabatan: "Spesialis Survei Perairan",
      deskripsi: "Riset Lapangan dan Budidaya Berkelanjutan",
    },
    {
      nama: "Refi N. Ramadhan Putra",
      jabatan: "Spesialis Hukum Konservasi",
      deskripsi: "Hukum Lingkungan dan Tata Kelola",
    },
    {
      nama: "Dian Indriawati",
      jabatan: "Community Engagement Intern",
      deskripsi: "Edukasi Komunitas dan Community Empowerment",
    },
    {
      nama: "Tri A. Fadilla",
      jabatan: "Research dan Conservation Intern",
      deskripsi: "Survei Lapangan dan Freshwater Biodiversity",
    },
    {
      nama: "Erick P. Hadiputra",
      jabatan: "Spesialis Konservasi In-Situ",
      deskripsi: "Shelter Akuatik dan Monitoring Habitat",
    },
    {
      nama: "Abian Surya Nasita",
      jabatan: "Aquaculture Research Intern",
      deskripsi: "Akuakultur dan Field Support",
    },
  ],
};


export default function TentangPage() {
  const tim = Array.from({ length: 12 });

  const mitra = Array.from({ length: 10 });

  const dokumen = [
    "Laporan Tahunan",
    "Profil Organisasi",
    "Panduan Sighting",
    "Publikasi Ilmiah",
    "Dokumen Konservasi",
    "Laporan Kegiatan",
  ];

  return (
    <main className="bg-black text-white min-h-screen">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-yellow-400 uppercase tracking-[0.2em] text-sm">
              Tentang Kami
            </span>

            <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6">
              Freshwater Fish
              <br />
              of Indonesia
            </h1>

            <p className="text-gray-300 leading-relaxed">
              Freshwater Fish of Indonesia (FFOI) merupakan organisasi
              yang berfokus pada dokumentasi, penelitian, edukasi, dan
              konservasi biodiversitas ikan air tawar Indonesia.
            </p>

            <div className="flex flex-wrap gap-6 mt-8 text-sm">
              <div>
                <p className="text-yellow-400 font-bold">15+</p>
                <p className="text-gray-400">Anggota</p>
              </div>

              <div>
                <p className="text-yellow-400 font-bold">12+</p>
                <p className="text-gray-400">Lokasi Survei</p>
              </div>

              <div>
                <p className="text-yellow-400 font-bold">50K+</p>
                <p className="text-gray-400">Komunitas</p>
              </div>
            </div>
          </div>

          {/* Placeholder Banner */}
          <div className="h-[400px] rounded-3xl bg-zinc-900 border border-dashed border-yellow-400/30 flex items-center justify-center">
            <span className="text-gray-500">
              Banner Tentang Kami
            </span>
          </div>
        </div>
      </section>

      {/* VISI MISI */}
      <section
        id="visi-misi"
        className="max-w-7xl mx-auto px-6 md:px-10 py-20"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-white/10 rounded-3xl p-8">
            <h2 className="text-yellow-400 text-2xl font-bold mb-6">
              Visi
            </h2>

            <p className="text-gray-300 leading-relaxed">
              Menjadi pusat informasi dan konservasi biodiversitas ikan
              air tawar Indonesia yang terpercaya.
            </p>
          </div>

          <div className="border border-white/10 rounded-3xl p-8">
            <h2 className="text-yellow-400 text-2xl font-bold mb-6">
              Misi
            </h2>

            <ul className="space-y-3 text-gray-300">
              <li>• Dokumentasi biodiversitas.</li>
              <li>• Mendukung penelitian.</li>
              <li>• Edukasi masyarakat.</li>
              <li>• Konservasi habitat.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CERITA */}
      <section
        id="cerita-kami"
        className="max-w-7xl mx-auto px-6 md:px-10 pb-20"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Cerita Kami
            </h2>

            <p className="text-gray-300 leading-relaxed">
              FFOI lahir dari semangat untuk mendokumentasikan dan
              melestarikan biodiversitas perairan tawar Indonesia.
              Melalui kolaborasi berbagai pihak, kami berupaya
              membangun basis data yang dapat mendukung penelitian,
              edukasi, dan konservasi.
            </p>
          </div>

          <div className="h-[300px] rounded-3xl bg-zinc-900 border border-dashed border-yellow-400/30 flex items-center justify-center">
            Foto Kegiatan
          </div>
        </div>
      </section>

      {/* TIM KAMI */}
<section
  id="tim-kami"
  className="max-w-7xl mx-auto px-6 md:px-10 py-20"
>
  <h2 className="text-4xl font-bold mb-2">
    Tim Kami
  </h2>

  <p className="text-gray-400 mb-16">
    Tim multidisiplin yang berdedikasi dalam penelitian,
    konservasi, dan edukasi perairan Indonesia.
  </p>

  {/* Pimpinan */}
  <div className="mb-16">
    <h3 className="text-yellow-400 font-semibold mb-8 uppercase tracking-wider">
      Pimpinan
    </h3>

    <div className="flex justify-center">
      {strukturTim.pimpinan.map((item) => (
        <div
          key={item.nama}
          className="max-w-xs text-center"
        >
          <div className="w-28 h-28 rounded-full bg-zinc-800 mx-auto mb-4" />

          <h4 className="font-semibold">
            {item.nama}
          </h4>

          <p className="text-yellow-400 text-sm mt-1">
            {item.jabatan}
          </p>

          <p className="text-gray-400 text-sm mt-2">
            {item.deskripsi}
          </p>
        </div>
      ))}
    </div>
  </div>

  {/* Direktur */}
  <div className="mb-16">
    <h3 className="text-yellow-400 font-semibold mb-8 uppercase tracking-wider">
      Direktur
    </h3>

    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
      {strukturTim.direktur.map((item) => (
        <div key={item.nama}>
          <div className="w-24 h-24 rounded-full bg-zinc-800 mb-4" />

          <h4 className="font-semibold text-sm">
            {item.nama}
          </h4>

          <p className="text-yellow-400 text-xs mt-1">
            {item.jabatan}
          </p>

          <p className="text-gray-400 text-xs mt-2">
            {item.deskripsi}
          </p>
        </div>
      ))}
    </div>
  </div>

  {/* Koordinator */}
  <div className="mb-16">
    <h3 className="text-yellow-400 font-semibold mb-8 uppercase tracking-wider">
      Koordinator
    </h3>

    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
      {strukturTim.koordinator.map((item) => (
        <div key={item.nama}>
          <div className="w-24 h-24 rounded-full bg-zinc-800 mb-4" />

          <h4 className="font-semibold text-sm">
            {item.nama}
          </h4>

          <p className="text-yellow-400 text-xs mt-1">
            {item.jabatan}
          </p>

          <p className="text-gray-400 text-xs mt-2">
            {item.deskripsi}
          </p>
        </div>
      ))}
    </div>
  </div>

  {/* Staff & Intern */}
  <div>
    <h3 className="text-yellow-400 font-semibold mb-8 uppercase tracking-wider">
      Staff & Intern
    </h3>

    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
      {strukturTim.staf.map((item) => (
        <div key={item.nama}>
          <div className="w-24 h-24 rounded-full bg-zinc-800 mb-4" />

          <h4 className="font-semibold text-sm">
            {item.nama}
          </h4>

          <p className="text-yellow-400 text-xs mt-1">
            {item.jabatan}
          </p>

          <p className="text-gray-400 text-xs mt-2">
            {item.deskripsi}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* KEMITRAAN */}
      <section
        id="kemitraan"
        className="max-w-7xl mx-auto px-6 md:px-10 pb-20 scroll-mt-32"
      >
        <h2 className="text-4xl font-bold mb-10">
          Kemitraan
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {mitra.map((_, index) => (
            <div
              key={index}
              className="h-28 rounded-2xl border border-white/10 bg-zinc-900 flex items-center justify-center text-gray-500"
            >
              Logo Mitra
            </div>
          ))}
        </div>
      </section>

      {/* DOKUMEN */}
      <section
        id="dokumen"
        className="max-w-7xl mx-auto px-6 md:px-10 pb-20"
      >
        <h2 className="text-4xl font-bold mb-10">
          Dokumen
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {dokumen.map((item) => (
            <div
              key={item}
              className="bg-yellow-400 text-black rounded-3xl p-6"
            >
              <p className="font-bold text-lg">
                {item}
              </p>

              <p className="mt-2 text-sm">
                PDF
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* STATISTIK */}
      <section
        id="statistik"
        className="border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-5xl font-bold text-yellow-400">
                15+
              </h3>
              <p className="text-gray-400 mt-2">
                Anggota Tim
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-yellow-400">
                12+
              </h3>
              <p className="text-gray-400 mt-2">
                Lokasi Survei
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-yellow-400">
                15+
              </h3>
              <p className="text-gray-400 mt-2">
                Publikasi
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-yellow-400">
                50K+
              </h3>
              <p className="text-gray-400 mt-2">
                Anggota Komunitas
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}