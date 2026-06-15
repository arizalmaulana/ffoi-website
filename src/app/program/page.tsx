import Link from 'next/link';
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaMailBulk,
  FaGlobe,
  FaMapMarker,
} from "react-icons/fa";

export default function ProgramPage() {
  const programs = [
    {
      title: "Riset & Dokumentasi Biodiversitas",
      description:
        "Eksplorasi, penelitian, dan dokumentasi ikan asli Indonesia sebagai dasar ilmu pengetahuan dan konservasi.",
      points: [
        "Survei dan eksplorasi ikan air tawar",
        "Identifikasi dan dokumentasi spesies",
        "Riset taksonomi dan genetik",
        "Pemetaan distribusi",
        "Database biodiversitas"
      ],
      image: "/program unggulan/1.jpg",
    },
    {
      title: "Konservasi Habitat Perairan",
      description:
        "Melindungi ekosistem perairan dan habitat penting ikan asli Indonesia melalui aksi konservasi berbasis sains.",
      points: [
        "Konservasi in-situ",
        "Monitoring habitat",
        "Restorasi ekosistem",
        "Perlindungan blackwater",
        "Shelter spesies terancam"
      ],
      image: "/program unggulan/2.jpg",
    },
    {
      title: "Edukasi Masyarakat dan Pihak Terkait",
      description:
        "Meningkatkan kesadaran dan kapasitas masyarakat dalam menjaga biodiversitas perairan Indonesia.",
      points: [
        "Edukasi lingkungan",
        "Pelatihan masyarakat",
        "Citizen ichthyologist",
        "Program campaign ke sekolah dan universitas",
        "Penyadartahuan konservasi perairan"
      ],
      image: "/program unggulan/3.jpg",
    },
    {
      title: "Database Ikan Asli Indonesia",
      description:
        "Mengembangkan basis data digital biodiversitas ikan Indonesia yang terbuka, visual, dan berbagi lapangan.",
      points: [
        "Data spesies",
        "Distribusi ikan",
        "Arsip visual",
        "Fakta spesies",
        "Referensi ilmiah terbuka"
      ],
      image: "/program unggulan/4.png",
    },
    {
      title: "Pengembangan Perikanan Berkelanjutan",
      description:
        "Mendukung pengelolaan perairan yang berkelanjutan melalui budidaya ikan lokal dan penguatan komunitas.",
      points: [
        "Budidaya ikan lokal",
        "Pengembangan komunitas",
        "Perikanan berkelanjutan",
        "Pendampingan dan kemitraan",
        "Ekonomi biru perairan air tawar"
      ],
      image: "/program unggulan/5.jpg",
    },
  ];

  const impacts = [
    {
      title: "Perlindungan Habitat",
      image: "/dampak/1.jpg",
      description:
        "Melindungi ekosistem sungai, rawa, dan danau sebagai habitat alami ikan air tawar Indonesia agar tetap lestari dan berkelanjutan.",
    },
    {
      title: "Pelestarian Ikan Asli",
      image: "/dampak/3.jpg",
      description:
        "Mendukung konservasi spesies ikan asli Indonesia melalui penelitian, dokumentasi, dan upaya perlindungan dari ancaman kepunahan.",
    },
    {
      title: "Edukasi dan Kesadaran",
      image: "/dampak/4.jpg",
      description:
        "Meningkatkan pemahaman masyarakat tentang pentingnya keanekaragaman hayati perairan melalui kampanye, pelatihan, dan kegiatan edukatif.",
    },
    {
      title: "Pemberdayaan Masyarakat",
      image: "/dampak/6.png",
      description:
        "Melibatkan masyarakat lokal sebagai mitra konservasi untuk menciptakan manfaat ekonomi sekaligus menjaga kelestarian lingkungan.",
    },
    {
      title: "Data Untuk Masa Depan",
      image: "/dampak/5.jpg",
      description:
        "Menghasilkan basis data ilmiah yang dapat digunakan sebagai dasar pengambilan kebijakan dan strategi konservasi jangka panjang.",
    },
  ];

  // Data untuk Cara Kami Bekerja
  const caraKerja = [
    {
      title: "Eksplorasi Dan Survei Lapangan",
      desc: "Kami melakukan survei di sungai, danau, rawa gambut, dan berbagai ekosistem perairan Indonesia untuk mendokumentasikan keanekaragaman ikan dan kondisi habitatnya.",
      image: "/kontak/kt8.jpeg",
    },
    {
      title: "Penelitian Dan Analisis",
      desc: "Data yang diperoleh dianalisis melalui pendekatan taksonomi, ekologi, genetik, dan biogeografi untuk memahami status serta kebutuhan konservasi spesies.",
      image: "/kontak/kt3.jpeg",
    },
    {
      title: "Dokumentasi Dan Publikasi",
      desc: "Hasil penelitian dikemas menjadi buku, laporan, database digital, artikel, dan materi edukasi agar dapat dimanfaatkan oleh masyarakat, akademisi, dan pengambil kebijakan.",
      image: "/kontak/kt2.png",
    },
    {
      title: "Kolaborasi Dan Pemberdayaan",
      desc: "Kami bekerja sama dengan komunitas lokal, universitas, pemerintah, dan organisasi lain untuk memperkuat upaya konservasi dan meningkatkan kapasitas masyarakat.",
      image: "/kontak/kt1.jpg",
    },
    {
      title: "Konservasi Dan Pengelolaan",
      desc: "Informasi yang dihasilkan digunakan untuk mendukung perlindungan habitat, konservasi spesies, dan pengembangan perikanan lokal yang berkelanjutan.",
      image: "/kontak/kt5.jpg",
    },
  ];

  return (
    <main className="bg-black text-white min-h-screen">
      {/* ================= HERO & VALUE (COMBINED) ================= */}
      <section className="relative min-h-[700px] flex flex-col overflow-hidden text-white">
        {/* Background Image */}
        <img
          src="/image/Konservasi.jpg"
          alt="FFOI Program Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay & Gradasi */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

        {/* Konten Utama */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col flex-grow">
          {/* BAGIAN ATAS: Teks Hero */}
          <div className="flex-grow flex flex-col justify-center max-w-3xl pt-24 pb-16">
            <div className="flex items-center gap-2 text-xs md:text-sm font-semibold mb-4">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                Beranda
              </Link>
              <span className="text-yellow-400">›</span>
              <span className="text-yellow-400">Program</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mt-2 mb-6 tracking-wide uppercase">
              FFOI PROGRAM
            </h1>

            <p className="text-gray-300 md:text-lg leading-relaxed max-w-2xl">
              FFOI menjalankan berbagai program penelitian, konservasi, edukasi,
              dan pengembangan perairan berkelanjutan untuk mendukung
              perlindungan ikan asli Indonesia serta ekosistem perairannya. Melalui
              pendekatan berbasis sains, eksplorasi lapangan, dokumentasi
              biodiversitas, dan pemberdayaan masyarakat, kami berupaya menjaga
              kekayaan hayati perairan Indonesia agar tetap lestari bagi generasi
              mendatang.
            </p>
          </div>

          {/* BAGIAN BAWAH: Grid Ikon */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pb-10 pt-8 border-t border-white/20">
            {/* 1. Berbasis Sains */}
            <div className="flex gap-4 items-start">
              <svg className="w-8 h-8 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
              </svg>
              <div>
                <h3 className="text-yellow-400 font-bold text-sm md:text-base uppercase mb-1">Berbasis Sains</h3>
                <p className="text-gray-300 text-xs md:text-sm leading-snug">Pendekatan ilmiah dalam setiap program</p>
              </div>
            </div>

            {/* 2. Kolaboratif */}
            <div className="flex gap-4 items-start">
              <svg className="w-8 h-8 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
              <div>
                <h3 className="text-yellow-400 font-bold text-sm md:text-base uppercase mb-1">Kolaboratif</h3>
                <p className="text-gray-300 text-xs md:text-sm leading-snug">Bersinergi bersama mitra dan komunitas</p>
              </div>
            </div>

            {/* 3. Berkelanjutan */}
            <div className="flex gap-4 items-start">
              <svg className="w-8 h-8 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <div>
                <h3 className="text-yellow-400 font-bold text-sm md:text-base uppercase mb-1">Berkelanjutan</h3>
                <p className="text-gray-300 text-xs md:text-sm leading-snug">Untuk kelestarian perairan Indonesia</p>
              </div>
            </div>

            {/* 4. Berdaya */}
            <div className="flex gap-4 items-start">
              <svg className="w-8 h-8 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              <div>
                <h3 className="text-yellow-400 font-bold text-sm md:text-base uppercase mb-1">Berdaya</h3>
                <p className="text-gray-300 text-xs md:text-sm leading-snug">Memberdayakan masyarakat lokal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROGRAMS ================= */}
      <section id="program" className="max-w-[1440px] mx-auto px-6 md:px-10 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {programs.map((program, index) => (
            <div
              key={index}
              className="flex flex-col h-[590px] overflow-hidden rounded-[2rem] border border-yellow-400/70 bg-[#0a0a0a] transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400"
            >
              {/* IMAGE */}
              <div className="h-[140px] min-h-[140px] overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className="flex flex-col flex-1 p-6">
                {/* TITLE */}
                <h3 className="text-white font-bold text-lg leading-tight min-h-[72px] mb-3 uppercase">
                  {program.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-300 text-sm leading-relaxed min-h-[72px]">
                  {program.description}
                </p>

                {/* POINTS */}
                <ul className="space-y-3 text-sm text-gray-300 mt-auto">
                  {program.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-yellow-400 ">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= BAGAIMANA KAMI BEKERJA ================= */}
      <section id="cara-kerja" className="pb-24 border-t border-white/10">
        
        {/* --- Header Banner (Full Width Split-Screen) --- */}
        <div className="relative w-full min-h-[350px] md:min-h-[450px] flex items-center bg-black overflow-hidden mb-24">
          
          {/* Gambar di Kanan */}
          <div className="absolute top-0 right-0 bottom-0 w-full md:w-2/3 lg:w-[60%]">
            <img 
              src="/kontak/kt6.jpg" // Ganti dengan path foto orang memegang jaring
              alt="Cara Kami Bekerja" 
              className="w-full h-full object-cover object-center" 
            />
            
            {/* Gradasi pudar dari kiri agar menyatu dengan ruang hitam */}
            <div className="absolute inset-y-0 left-0 w-40 md:w-80 bg-gradient-to-r from-black via-black/80 to-transparent" />
            
            {/* Overlay tipis agar teks tetap aman jika digeser ke kanan di layar kecil */}
            <div className="absolute inset-0 bg-black/20 md:bg-transparent" />
          </div>

          {/* Teks di Kiri */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-16">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase mb-6 tracking-wide text-white leading-tight">
                BAGAIMANA <br className="hidden md:block"/> KAMI BEKERJA
              </h2>
              <p className="text-gray-300 md:text-lg leading-relaxed font-medium">
                Dari penelitian di lapangan hingga aksi konservasi, kami bekerja secara ilmiah, kolaboratif, dan berkelanjutan untuk melindungi ikan asli Indonesia.
              </p>
            </div>
          </div>
        </div>

        {/* --- Kontainer Utama untuk Timeline --- */}
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          
          {/* Timeline Container */}
          <div className="relative max-w-5xl mx-auto">
            {/* Garis Vertikal Tengah (Desktop Only) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-yellow-500/30 -translate-x-1/2" />

            <div className="space-y-12 md:space-y-0">
              {caraKerja.map((item, index) => (
                <div key={index} className="relative flex flex-col md:flex-row items-center justify-center md:h-[250px]">
                  
                  {/* KIRI: Gambar */}
                  <div className="w-full md:w-1/2 md:pr-16 mb-4 md:mb-0 h-full">
                    {/* Bingkai emas tipis seperti referensi */}
                    <div className="relative w-full h-56 md:h-full rounded-xl overflow-hidden border-[1.5px] border-yellow-500/50 p-1.5 group">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 rounded-lg"/>
                    </div>
                  </div>

                  {/* TENGAH: Lingkaran Angka */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-black border-4 border-yellow-400 text-white font-bold text-3xl items-center justify-center z-10 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                    {index + 1}
                  </div>

                  {/* KANAN: Teks Berwarna Kuning */}
                  <div className="w-full md:w-1/2 md:pl-16 h-full flex items-center">
                    <div className="bg-yellow-400 text-black p-6 md:p-8 rounded-xl w-full shadow-lg h-auto md:h-[90%] flex flex-col justify-center transition-transform hover:-translate-y-1 duration-300">
                      <h3 className="font-extrabold text-lg md:text-xl mb-3 uppercase tracking-wider">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base font-medium text-black/80 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Quote Banner (Bagian Bawah dari Cara Kami Bekerja) --- */}
        <div className="relative w-full py-28 px-6 md:px-10 mt-32 overflow-hidden flex items-center justify-center">
          {/* Background Image & Overlays */}
          <img src="/kontak/kt4.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Background" />
          <div className="absolute inset-0 bg-black/85" /> 
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />

          <div className="relative z-10 max-w-4xl mx-auto text-left">
            {/* Tanda Kutip Pembuka */}
            <span className="block text-7xl md:text-8xl text-yellow-400 font-serif leading-none h-10 md:h-14">
              “
            </span>
            
            <p className="text-2xl md:text-4xl lg:text-5xl font-bold leading-snug md:leading-tight text-white mt-4">
              Kami percaya bahwa konservasi yang efektif harus dimulai dari{" "}
              <span className="text-yellow-400">data yang kuat</span>, didukung oleh{" "}
              <span className="text-yellow-400">kolaborasi yang luas</span>, dan diwujudkan melalui{" "}
              <span className="text-yellow-400">aksi nyata</span> untuk melindungi ikan asli Indonesia dan ekosistem perairannya untuk generasi mendatang.
            </p>

            {/* Tanda Kutip Penutup */}
            <span className="block text-7xl md:text-8xl text-yellow-400 font-serif leading-none h-10 md:h-14 text-right mt-6">
              ”
            </span>
          </div>
        </div>
      </section>
      
      {/* ================= DAMPAK KAMI ================= */}
      <section id="dampak-kami" className="border-t border-white/10 py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">DAMPAK KAMI</h2>

          <p className="text-gray-400 max-w-3xl leading-relaxed mb-12">
            Setiap langkah kecil yang kami lakukan di lapangan, setiap data yang
            kami kumpulkan, dan setiap kolaborasi yang terjalin memberikan dampak
            nyata bagi kelestarian ikan asli Indonesia dan ekosistem perairannya.
          </p>

          {/* Statistik */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-20">
            {[
              ["25+", "Anggota Tim"],
              ["16+", "Lokasi Survei"],
              ["350+", "Spesies"],
              ["10+", "Publikasi"],
              ["30+", "Mitra"],
            ].map(([value, label]) => (
              <div key={label} className="border border-yellow-400/30 rounded-2xl p-5">
                <h3 className="text-4xl font-bold text-yellow-400">{value}</h3>
                <p className="text-gray-400 text-sm mt-2">{label}</p>
              </div>
            ))}
          </div>

          {/* Dampak Lapangan */}
          <h3 className="text-3xl font-bold mb-10">Dampak Nyata di Lapangan</h3>

          <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6 mb-20">
            {impacts.map((item) => (
              <div
                key={item.title}
                className="border border-yellow-400/30 rounded-2xl overflow-hidden bg-zinc-950 hover:border-yellow-400 transition-colors"
              >
                <div className="h-35 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-5">
                  <h4 className="font-bold mb-3 text-white">
                    {item.title}
                  </h4>

                  <p className="text-sm text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Tujuan + Quote */}
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-bold mb-4 text-yellow-400">Tujuan Kami</h3>
              <p className="text-gray-300 leading-relaxed">
                Menciptakan masa depan di mana keanekaragaman hayati perairan
                Indonesia tetap lestari, didukung oleh ilmu pengetahuan,
                kolaborasi, dan kepedulian bersama.
              </p>
            </div>
            <div>
              <blockquote className="text-2xl italic text-gray-200 leading-relaxed">
                “Kami percaya, melindungi ikan asli Indonesia berarti menjaga
                kehidupan, budaya, dan masa depan generasi mendatang.”
              </blockquote>
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
      
              <a href='https://wa.me/6282148579794' className="bg-yellow-400 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-300 transition">
                SUPPORT US
              </a>
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