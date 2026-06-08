import Link from 'next/link';
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaMailBulk,
  FaGlobe,
  FaMapMarker,
} from "react-icons/fa";

const strukturTim = {
  pimpinan: [
    {
      nama: "Marcel A. Adis",
      jabatan: "Direktur Eksekutif",
      deskripsi: "Iktiologi dan Konservasi Perairan",
      image: "/tim/Marcel Alveri Adis.JPG",
    },
  ],

  direktur: [
    {
      nama: "Leonardo Davinci",
      jabatan: "Direktur Riset dan Budidaya Ikan",
      deskripsi: "Riset Akuatik dan Budidaya Berkelanjutan",
      image: "/tim/Leonardo Davinci .jpg",
    },
    {
      nama: "Adam P. Ardiyan",
      jabatan: "Direktur Konservasi dan Pengelolaan",
      deskripsi: "Konservasi Perairan dan Pengembangan Ekosistem",
      image: "/tim/Adam Pramudya .png",
    },
    {
      nama: "Guy F. Amrado Sitorus",
      jabatan: "Direktur Community Development dan Edukasi",
      deskripsi: "Edukasi Lingkungan dan Outreach Publik",
      image: "/tim/Guy franklin Sitorus .jpg",
    },
    {
      nama: "Giovanni R. Putra",
      jabatan: "Direktur Kemitraan dan Kolaborasi",
      deskripsi: "Kemitraan Strategis dan Kolaborasi Konservasi",
      image: "/tim/Giovanni r. Putra.jpg",
    },
    {
      nama: "Yohanes Baptista",
      jabatan: "Direktur Keuangan dan Hibah",
      deskripsi: "Manajemen Keuangan dan Hibah",
      image: "/tim/Yohanes baptista.png",
    },
  ],

  koordinator: [
    {
      nama: "Timotius Arianto",
      jabatan: "Koordinator Eksplorasi Perairan",
      deskripsi: "Persebaran Ikan dan Eksplorasi Habitat",
      image: "/tim/Timotius Arianto.jpg",
    },
    {
      nama: "Resqi Pranadi",
      jabatan: "Koordinator Konservasi Lapangan",
      deskripsi: "Monitoring Habitat dan Konservasi Spesies",
      image: "/tim/Resqi pranadi.JPG",
    },
    {
      nama: "Ahsan A. Hidayat",
      jabatan: "Koordinator Dokumentasi dan Citizen Ichthyologist",
      deskripsi: "Dokumentasi Lapangan dan Citizen Ichthyologist",
      image: "/tim/Ahsan al hidayat .jpg",
    },
    {
      nama: "Fenny Syamsurizal",
      jabatan: "Koordinator Kemitraan dan Relasi Institusi",
      deskripsi: "Relasi Institusi dan Pengembangan Jaringan",
      image: "/tim/Fenny syamsurizal.jpg",
    },
    {
      nama: "Septi Antika",
      jabatan: "Administrasi",
      deskripsi: "Administrasi Organisasi dan Manajemen Operasional",
      image: "/tim/Septi Antika.jpg",
    },
  ],

  staf: [
    {
      nama: "Ahmad Syahrul",
      jabatan: "Spesialis Survei Perairan",
      deskripsi: "Riset Lapangan dan Budidaya Berkelanjutan",
      image: "/tim/Ahmad Syahrul.JPG",
    },
    {
      nama: "Refi N. Ramadhan Putra",
      jabatan: "Spesialis Hukum Konservasi",
      deskripsi: "Hukum Lingkungan dan Tata Kelola",
      image: "/tim/Refi nur.jpg",
    },
    {
      nama: "Dian Indriawati",
      jabatan: "Community Engagement Intern",
      deskripsi: "Edukasi Komunitas dan Community Empowerment",
      image: "/tim/Dian indirawati.PNG",
    },
    {
      nama: "Tri A. Fadilla",
      jabatan: "Research dan Conservation Intern",
      deskripsi: "Survei Lapangan dan Freshwater Biodiversity",
      image: "/tim/Tri Ainun Fadilla .jpg",
    },
    {
      nama: "Erick P. Hadiputra",
      jabatan: "Spesialis Konservasi In-Situ",
      deskripsi: "Shelter Akuatik dan Monitoring Habitat",
      image: "/tim/Erick p. Hadiputra.jpg",
    },
    {
      nama: "Abian Surya Nasita",
      jabatan: "Aquaculture Research Intern",
      deskripsi: "Akuakultur dan Field Support",
      image: "/tim/Abian surya .JPG",
    },
  ],
};

export default function TentangPage() {
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
      {/* HERO SECTION */}
      <section className="relative h-[650px] overflow-hidden text-white">
        <img
          src="/tim/Foto atas.jpg.jpeg"
          alt="Tentang Kami FFOI"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 h-full flex flex-col justify-center">
          <div className="max-w-3xl mt-12">
            <div className="flex items-center gap-2 text-xs md:text-sm font-semibold mb-4">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                Beranda
              </Link>
              <span className="text-yellow-400">›</span>
              <span className="text-yellow-400">Tentang Kami</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mt-2 mb-6 tracking-wide">
              TENTANG KAMI
            </h1>
            <p className="text-gray-300 md:text-lg leading-relaxed mb-10">
              FFOI adalah organisasi independen yang berfokus pada penelitian, dokumentasi, dan perlindungan ikan asli serta ekosistem perairan tawar Indonesia. Melalui pendekatan berbasis sains, kolaborasi, edukasi, dan pemberdayaan masyarakat, kami memastikan bahwa kekayaan hayati Indonesia tetap lestari untuk generasi mendatang.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-t border-white/10 pt-8">
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <div className="leading-tight">
                  <span className="block text-gray-400 text-xs font-semibold uppercase">Didirikan</span>
                  <span className="text-sm font-medium">2015</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <div className="leading-tight">
                  <span className="block text-gray-400 text-xs font-semibold uppercase">Lokasi</span>
                  <span className="text-sm font-medium">Indonesia</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                <div className="leading-tight">
                  <span className="block text-gray-400 text-xs font-semibold uppercase">Status</span>
                  <span className="text-sm font-medium">Organisasi Nirlaba</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                <div className="leading-tight">
                  <span className="block text-gray-400 text-xs font-semibold uppercase">Berkontribusi untuk</span>
                  <span className="text-sm font-medium">Perairan Indonesia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISI MISI */}
      <section id="visi-misi" className="max-w-7xl mx-auto px-6 md:px-10 py-20 text-white">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h2 className="text-2xl font-bold mb-8 uppercase tracking-wide">
              VISI & MISI
            </h2>
            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-yellow-400 font-bold text-lg mb-2">VISI</h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    Menjadi lembaga terdepan dalam konservasi ikan dan ekosistem perairan air tawar Indonesia yang diakui secara nasional dan internasional.
                  </p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-yellow-400 font-bold text-lg mb-2">MISI</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-gray-300 marker:text-gray-500">
                    <li>Melakukan penelitian dan dokumentasi ilmiah akan air tawar Indonesia.</li>
                    <li>Melindungi spesies ikan asli dan habitat perairan yang terancam.</li>
                    <li>Meningkatkan edukasi dan kesadaran masyarakat tentang biodiversitas perairan.</li>
                    <li>Mendukung pengembangan lokal yang berkelanjutan dan ramah lingkungan.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide">
              CERITA KAMI
            </h2>
            <div className="text-gray-300 text-sm md:text-base leading-relaxed space-y-4 mb-8">
              <p>
                Berawal dari kecintaan terhadap ikan air tawar Indonesia, FFOI tumbuh dari sebuah komunitas daring di Facebook hingga berkembang menjadi yayasan resmi yang berfokus pada penelitian, dokumentasi, dan konservasi perairan Indonesia. Dengan visi yang sama, kami berupaya melindungi kekayaan hayati perairan Indonesia sebelum lebih banyak spesies berharga hilang dan tak tergantikan.
              </p>
              <p>
                Sejak tahun 2015, FFOI terus berkembang melalui kerja keras, kolaborasi, dan dukungan dari berbagai pihak untuk memastikan ikan asli Indonesia tetap lestari bagi generasi mendatang.
              </p>
            </div>
            <div className="w-full aspect-video md:aspect-[16/9] rounded-xl overflow-hidden relative mt-auto">
              <img
                src="/tim/Foto rame2 (1).jpg.jpeg"
                alt="Tim Ekspedisi"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
            </div>
          </div>
        </div>
      </section>

      {/* TIM KAMI */}
      <section id="tim-kami" className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide uppercase">
            Tim Kami
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Tim multidisiplin yang berdedikasi penuh dalam penelitian, konservasi, 
            dan edukasi perairan Indonesia.
          </p>
        </div>

        {/* PIMPINAN */}
        <div className="mb-20">
          {/* Borderline Header */}
          <div className="flex items-center gap-6 mb-10">
            <div className="h-px bg-white/10 flex-grow"></div>
            <h3 className="text-yellow-400 font-bold text-lg uppercase tracking-[0.2em]">
              Pimpinan
            </h3>
            <div className="h-px bg-white/10 flex-grow"></div>
          </div>

          <div className="flex justify-center">
            {strukturTim.pimpinan.map((item) => (
              <div 
                key={item.nama} 
                className="group flex flex-col items-center text-center p-8 w-full max-w-sm rounded-3xl border border-white/10 bg-[#0a0a0a] transition-all duration-500 hover:-translate-y-2 hover:border-yellow-400/50 hover:shadow-[0_10px_30px_rgba(250,204,21,0.05)]"
              >
                <div className="w-32 h-32 rounded-full mb-6 overflow-hidden border border-white/20 group-hover:border-yellow-400 transition-colors duration-500 p-1">
                  <img 
                    src={item.image} 
                    alt={item.nama} 
                    className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <h4 className="font-bold text-xl text-white mb-1">
                  {item.nama}
                </h4>
                <p className="text-yellow-400 text-sm font-semibold uppercase tracking-wider mb-4">
                  {item.jabatan}
                </p>
                <div className="w-10 h-px bg-white/20 mb-4 group-hover:bg-yellow-400/50 transition-colors duration-500"></div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.deskripsi}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* DIREKTUR */}
        <div className="mb-20">
          {/* Borderline Header */}
          <div className="flex items-center gap-6 mb-10">
            <div className="h-px bg-white/10 flex-grow"></div>
            <h3 className="text-yellow-400 font-bold text-lg uppercase tracking-[0.2em]">
              Direktur
            </h3>
            <div className="h-px bg-white/10 flex-grow"></div>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {strukturTim.direktur.map((item) => (
              <div 
                key={item.nama} 
                className="group flex flex-col items-center text-center p-6 rounded-2xl border border-white/10 bg-[#0a0a0a] transition-all duration-500 hover:-translate-y-1.5 hover:border-yellow-400/40"
              >
                <div className="w-24 h-24 rounded-full mb-5 overflow-hidden border border-white/10 group-hover:border-yellow-400/80 transition-colors duration-500 p-1">
                  <img 
                    src={item.image} 
                    alt={item.nama} 
                    className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <h4 className="font-bold text-white mb-1 text-sm md:text-base">
                  {item.nama}
                </h4>
                <p className="text-yellow-400 text-[11px] font-semibold uppercase tracking-wider mb-3">
                  {item.jabatan}
                </p>
                <div className="w-8 h-px bg-white/10 mb-3 group-hover:bg-yellow-400/50 transition-colors duration-500"></div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {item.deskripsi}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* KOORDINATOR */}
        <div className="mb-20">
          {/* Borderline Header */}
          <div className="flex items-center gap-6 mb-10">
            <div className="h-px bg-white/10 flex-grow"></div>
            <h3 className="text-yellow-400 font-bold text-lg uppercase tracking-[0.2em]">
              Koordinator
            </h3>
            <div className="h-px bg-white/10 flex-grow"></div>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {strukturTim.koordinator.map((item) => (
              <div 
                key={item.nama} 
                className="group flex flex-col items-center text-center p-6 rounded-2xl border border-white/10 bg-[#0a0a0a] transition-all duration-500 hover:-translate-y-1.5 hover:border-yellow-400/40"
              >
                <div className="w-24 h-24 rounded-full mb-5 overflow-hidden border border-white/10 group-hover:border-yellow-400/80 transition-colors duration-500 p-1">
                  <img 
                    src={item.image} 
                    alt={item.nama} 
                    className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <h4 className="font-bold text-white mb-1 text-sm md:text-base">
                  {item.nama}
                </h4>
                <p className="text-yellow-400 text-[11px] font-semibold uppercase tracking-wider mb-3">
                  {item.jabatan}
                </p>
                <div className="w-8 h-px bg-white/10 mb-3 group-hover:bg-yellow-400/50 transition-colors duration-500"></div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {item.deskripsi}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* STAFF & INTERN */}
        <div>
          {/* Borderline Header */}
          <div className="flex items-center gap-6 mb-10">
            <div className="h-px bg-white/10 flex-grow"></div>
            <h3 className="text-yellow-400 font-bold text-lg uppercase tracking-[0.2em]">
              Staff & Intern
            </h3>
            <div className="h-px bg-white/10 flex-grow"></div>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {strukturTim.staf.map((item) => (
              <div 
                key={item.nama} 
                className="group flex flex-col items-center text-center p-5 rounded-2xl border border-white/10 bg-[#0a0a0a] transition-all duration-500 hover:-translate-y-1.5 hover:border-yellow-400/40"
              >
                <div className="w-20 h-20 rounded-full mb-4 overflow-hidden border border-white/10 group-hover:border-yellow-400/80 transition-colors duration-500 p-1">
                  <img 
                    src={item.image} 
                    alt={item.nama} 
                    className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <h4 className="font-bold text-white mb-1 text-sm">
                  {item.nama}
                </h4>
                <p className="text-yellow-400 text-[10px] font-semibold uppercase tracking-wider mb-2">
                  {item.jabatan}
                </p>
                <div className="w-6 h-px bg-white/10 mb-2 group-hover:bg-yellow-400/50 transition-colors duration-500"></div>
                <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-3">
                  {item.deskripsi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KEMITRAAN */}
      <section id="kemitraan" className="max-w-7xl mx-auto px-6 md:px-10 pb-20 scroll-mt-32">
        <h2 className="text-4xl font-bold mb-10">
          Kemitraan
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {mitra.map((_, index) => (
            <div key={index} className="h-28 rounded-2xl border border-white/10 bg-zinc-900 flex items-center justify-center text-gray-500">
              Logo Mitra
            </div>
          ))}
        </div>
      </section>

      {/* DOKUMEN */}
      <section id="dokumen" className="max-w-7xl mx-auto px-6 md:px-10 pb-20">
        <h2 className="text-4xl font-bold mb-10">
          Dokumen
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {dokumen.map((item) => (
            <div key={item} className="bg-yellow-400 text-black rounded-3xl p-6">
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
      <section id="statistik" className="border-t border-white/10">
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
      {/* ================= FOOTER ================= */}
          <footer className="bg-black text-white pt-20 px-6 md:px-16">
      
            {/* TOP CTA */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold tracking-wide mb-6">
                MAKE A <br /> DIFFERENCE
              </h2>
      
              <button className="bg-yellow-400 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-300 transition">
                SUPPORT US
              </button>
            </div>
      
            {/* FOOTER GRID */}
            <div className="grid md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
      
              {/* TENTANG */}
              <div>
                <h3 className="font-semibold mb-4 text-sm tracking-wide">
                  TENTANG KAMI
                </h3>
      
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>
                    <a href="/tentang#visi-misi" className="hover:text-yellow-400">
                      Visi dan Misi
                    </a>
                  </li>
      
                  <li>
                    <a href="/tentang#tim-kami" className="hover:text-yellow-400">
                      Tim Kami
                    </a>
                  </li>
      
                  <li>
                    <a href="/tentang#kemitraan" className="hover:text-yellow-400">
                      Kemitraan
                    </a>
                  </li>
      
                  <li>
                    <a href="/tentang#dokumen" className="hover:text-yellow-400">
                      Dokumen
                    </a>
                  </li>
                </ul>
              </div>
      
              {/* KONTAK */}
              <div>
                <h3 className="font-semibold mb-4 text-sm tracking-wide">
                  KONTAK
                </h3>
      
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-center gap-2">
                      <FaMailBulk size={16} className="text-yellow-400" />
                      freshwaterfishofindonesia@gmail.com
                    </li>
      
                    <li className="flex items-center gap-2">
                      <FaGlobe size={16} className="text-yellow-400" />
                      ffoi.or.id
                    </li>
      
                    <li className="flex items-center gap-2">
                      <FaMapMarker size={16} className="text-yellow-400" />
                      Indonesia
                    </li>
                  </ul>
              </div>
      
              {/* SOCIAL + EMAIL */}
              <div>
                <h3 className="font-semibold mb-4 text-sm tracking-wide">
                  IKUTI KAMI
                </h3>
      
                {/* SOCIAL ICON */}
                <div className="flex gap-4 mb-6">
                  <a
                    href="https://www.instagram.com/freshwaterfishofindonesia?igsh=MXR4N25oeHEyN3pwcg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram FFOI"
                  >
                    <FaInstagram className="w-6 h-6 text-white hover:text-yellow-400 transition cursor-pointer" />
                  </a>
      
                  <a
                    href="https://www.facebook.com/share/1FMzGXXemk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook FFOI"
                  >
                    <FaFacebook className="w-6 h-6 text-white  hover:text-yellow-400 transition cursor-pointer" />
                  </a>
      
                </div>
              </div>
      
            </div>
      
            {/* COPYRIGHT */}
            <div className="text-center text-gray-500 text-xs py-6">
              2026 Yayasan Freshwater Fish of Indonesia (FFOI). All rights reserved.
            </div>
      
          </footer> 
    </main>
  );
}