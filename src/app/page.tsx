import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { Mail, Globe, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";

async function getSightings() {
  const { data } = await supabase
    .from("sighting")
    .select("*")
    .order("dibuat_pada", { ascending: false })
    .limit(6);

  return data || [];
}

export default async function Home() {

  const data = await getSightings();
  return (
    <main>

      {/* HERO */}
      <section className="relative h-screen bg-black text-white overflow-hidden">

        {/* Navbar */}
        <Navbar />

        <div className="grid md:grid-cols-2 h-full">

          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center px-10 md:px-20 z-10">

            <p className="text-yellow-400 font-semibold mb-3">
              YAYASAN FFOI
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              KENALI DAN <br />
              LINDUNGI <br />
              <span className="text-yellow-400">
                IKAN ASLI <br />
                INDONESIA
              </span>
            </h1>

            <p className="mt-6 max-w-md text-gray-300">
              Kami berkomitmen untuk penelitian, konservasi, dan edukasi ikan
              dan biota perairan asli Indonesia serta pengembangan perikanan
              lokal berkelanjutan demi keberlanjutan biodiversitas perairan Indonesia
            </p>

            {/* BUTTON */}
            <div className="flex gap-4 mt-8">

              <a href="https://example.com" target="_blank">
                <button className="bg-yellow-400 text-black px-6 py-3 rounded-md font-semibold">
                  JELAJAHI PROGRAM →
                </button>
              </a>

              <a href="https://youtube.com" target="_blank">
                <button className="bg-white text-black px-6 py-3 rounded-md flex items-center gap-2">
                  ▶ TONTON VIDEO
                </button>
              </a>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="relative h-full">

            <img
              src="/images/Cover-pertama.PNG"
              className="w-full h-full object-cover"
            />

            {/* overlay gradient biar blend */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black"></div>

          </div>

        </div>

      </section>

      {/* ================= SECTION 2 ================= */}
      <section className="relative w-full h-[95vh] flex items-center overflow-hidden bg-[#f3f3f3]">

        {/* LEFT CONTENT */}
        <div className="relative z-10 w-full md:w-3/2 px-10 md:px-20">

          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-black">
            BERKONTRIBUSI UNTUK <br />
            MASA DEPAN PERAIRAN <br />
            INDONESIA
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed max-w-lg">
            FFOI adalah organisasi konservasi independen yang berfokus pada penelitian,
            dokumentasi, dan perlindungan ikan asli serta ekosistem Air Tawar Indonesia.
          </p>

          <p className="text-gray-700 mb-10 leading-relaxed max-w-lg">
            Melalui pendekatan berbasis sains, kolaborasi, edukasi, dan pemberdayaan
            masyarakat, kami memastikan bahwa kekayaan hayati Indonesia tetap lestari
            untuk generasi mendatang.
          </p>

          <button className="border border-yellow-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 hover:text-white transition">
            SELENGKAPNYA →
          </button>

        </div>

        {/* RIGHT IMAGE */}
        <div className="absolute right-0 top-0 w-full md:w-2/3 h-full">

          <img
            src="/images/Foto berkontribusi untuk masa depan perairan Indonesia.JPG"
            className="w-full h-full object-cover"
          />

          {/* GRADIENT HALUS (INI YANG PALING PENTING) */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#f3f3f3]/0 to-[#f3f3f3]"></div>

        </div>

      </section>

      {/* ================= FOKUS KAMI ================= */}
      <section className="bg-black text-white py-24 px-10">

        {/* TITLE */}
        <div className="flex items-center justify-center mb-20">
          <div className="h-[2px] w-24 bg-yellow-500 mr-6"></div>

          <h2 className="text-3xl font-bold text-yellow-500 tracking-[0.2em]">
            FOKUS KAMI
          </h2>

          <div className="h-[2px] w-24 bg-yellow-500 ml-6"></div>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-4">

          {[
            {
              icon: "/icons/penelitian.png",
              title: "PENELITIAN",
              desc: "Studi ilmiah untuk memahami biodiversitas ikan dan ekosistem perairan Air Tawar Indonesia",
            },
            {
              icon: "/icons/konservasi.png",
              title: "KONSERVASI",
              desc: "Melindungi spesies ikan asli dan habitat perairan yang terancam melalui aksi nyata di lapangan",
            },
            {
              icon: "/icons/edukasi.png",
              title: "EDUKASI",
              desc: "Meningkatkan kesadaran dan pengetahuan melalui program edukasi dan publikasi ilmiah",
            },
            {
              icon: "/icons/perikanan berkelanjutan.png",
              title: "PERIKANAN BERKELANJUTAN",
              desc: "Mendukung pengembangan perikanan lokal yang ramah lingkungan dan berkelanjutan",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative px-6 md:px-10 flex flex-col items-center text-center min-h-[300px]"
            >
              {/* ICON WRAPPER (biar sejajar) */}
              <div className="h-24 flex items-center justify-center mb-4">
                <img
                  src={item.icon}
                  className="w-50 object-contain"
                />
              </div>

              {/* TITLE (tinggi konsisten) */}
              <div className="h-12 flex items-center">
                <h3 className="font-bold tracking-wide">
                  {item.title}
                </h3>
              </div>

              {/* DESC (flex grow biar rata bawah) */}
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs mt-2">
                {item.desc}
              </p>

              {/* DIVIDER */}
              {i !== 3 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-40 w-[1px] bg-gray-700"></div>
              )}
            </div>
          ))}

        </div>

      </section>

      {/* ================= PROGRAM UNGGULAN ================= */}
      <section className="bg-yellow-400 py-16 px-6 md:px-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            PROGRAM UNGGULAN
          </h2>

          <button className="text-black font-semibold">
            LIHAT SEMUA PROGRAM →
          </button>
        </div>

        {/* CARD LIST */}
        <div className="flex gap-6 overflow-x-auto">

          {[
            {
              image: "/images/Ekspedisi.jpg",
              title: "Ekspedisi Perairan Indonesia",
              desc: "Eksplorasi ilmiah untuk mendokumentasikan keanekaragaman ikan air tawar di berbagai wilayah Indonesia.",
            },
            {
              image: "/images/Konservasi.jpg",
              title: "Konservasi Habitat Perairan",
              desc: "Melindungi ekosistem perairan dan habitat unik yang menjadi rumah bagi spesies endemik dan native.",
            },
            {
              image: "/images/series buku.png",
              title: "Series Buku dan Jurnal Indonesia",
              desc: "Publikasi jurnal dan buku untuk mendokumentasikan ikan Indonesia secara komprehensif.",
            },
            {
              image: "/images/edukasi perairan tawar.jpg",
              title: "Inisiasi Edukasi Perairan Tawar",
              desc: "Program edukasi dan pelatihan untuk meningkatkan kesadaran tentang biodiversitas perairan.",
            },
            {
              image: "/images/Foto berkontribusi untuk masa depan perairan Indonesia.JPG",
              title: "Perikanan Berkelanjutan",
              desc: "Bersama masyarakat lokal untuk mengembangkan praktik perikanan berkelanjutan.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative w-[280px] h-[380px] rounded-xl overflow-hidden flex-none"
            >
              {/* IMAGE (AUTO CROP) */}
              <img
                src={item.image}
                className="w-full h-full object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

              {/* TEXT */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-bold text-base mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-200 leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

        </div>

      </section>

      {/* ================= DATABASE IKAN ================= */}
      <section className="relative text-white">

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <img
            src="/images/background database.png"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="relative z-10 py-20 px-6 md:px-10">

          {/* TITLE */}
          <div className="mb-10 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              DATABASE IKAN <br />
              <span className="text-yellow-400">
                INDONESIA
              </span>
            </h2>

            <p className="mt-4 text-gray-300 text-sm">
              Jelajahi lebih dari 1.700 spesies ikan asli Indonesia melalui database biodiversitas berbasis sains milik FFOI.
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl">
            {[
              { title: "1.700+", label: "Spesies Terdokumentasi" },
              { title: "37", label: "Provinsi Indonesia" },
              { title: "1.000+", label: "Referensi Ilmiah" },
              { title: "Terus", label: "Diperbarui" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10"
              >
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-xs text-gray-300">{item.label}</p>
              </div>
            ))}
          </div>

          {/* SEARCH */}
          <div className="flex gap-3 mb-10 max-w-4xl">
            <input
              placeholder="Cari spesies ikan, genus, lokasi..."
              className="flex-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg px-4 py-3 text-sm outline-none"
            />

            <button className="bg-yellow-400 text-black px-6 rounded-lg font-semibold">
              FILTER
            </button>
          </div>

          {/* CARD LIST */}
          <div className="flex gap-4 overflow-x-auto">

            {[
              {
                image: "/images/IMG_6725.jpg",
                name: "Betta anabatoides",
                location: "Sumatera",
              },
              {
                image: "/images/IMG_6725.jpg",
                name: "Channa marulioides",
                location: "Kalimantan",
              },
              {
                image: "/images/IMG_6725.jpg",
                name: "Rasbora",
                location: "Jawa",
              },
              {
                image: "/images/IMG_6725.jpg",
                name: "Tateurndina",
                location: "Papua",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="w-[180px] flex-none bg-white/10 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden"
              >
                <img
                  src={item.image}
                  className="w-full h-[120px] object-cover"
                />

                <div className="p-3">
                  <h4 className="text-sm font-semibold">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-300">
                    {item.location}
                  </p>
                </div>
              </div>
            ))}

          </div>

          {/* BUTTON */}
          <div className="mt-10">
            <button className="border border-yellow-400 text-yellow-400 px-6 py-3 rounded-full font-semibold">
              JELAJAHI SEMUA 1.700+ SPESIES →
            </button>
          </div>

        </div>
      </section>

      {/* ================= CTA PERIKANAN ================= */}
      <section className="grid md:grid-cols-[3fr_2fr]">

        {/* LEFT IMAGE */}
        <div className="w-full aspect-[3/2]">
          <img
            src="/images/Foto bersama.png"
            className="w-full h-full object-cover object-left"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="bg-yellow-400 flex items-center px-10 md:px-16">

          <div className="max-w-lg">

            {/* LABEL */}
            <p className="text-sm font-semibold tracking-wide mb-3 text-black/70">
              BERSAMA MASYARAKAT
            </p>

            {/* TITLE */}
            <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.1] mb-6 text-black">
              PERIKANAN LOKAL, <br />
              MASA DEPAN <br />
              BERKELANJUTAN
            </h2>

            {/* DESC */}
            <p className="text-black/80 text-sm md:text-base leading-relaxed mb-8">
              Kami percaya bahwa konservasi dan kesejahteraan masyarakat berjalan
              beriringan. FFOI bekerja bersama komunitas lokal untuk mengembangkan
              perikanan yang produktif, adil, dan ramah lingkungan.
            </p>

            {/* BUTTON */}
            <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              PELAJARI CARA KAMI BEKERJA
            </button>

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
            <li>Visi dan Misi</li>
            <li>Tim Kami</li>
            <li>Kemitraan</li>
            <li>Dokumen</li>
          </ul>
        </div>

        {/* KONTAK */}
        <div>
          <h3 className="font-semibold mb-4 text-sm tracking-wide">
            KONTAK
          </h3>

          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex items-center gap-2">
                <Mail size={16} className="text-yellow-400" />
                freshwaterfishofindonesia@gmail.com
              </li>

              <li className="flex items-center gap-2">
                <Globe size={16} className="text-yellow-400" />
                ffoi.or.id
              </li>

              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-yellow-400" />
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
            <Instagram className="w-6 h-6 text-white hover:text-yellow-400 cursor-pointer" />
            <Facebook className="w-6 h-6 text-white hover:text-yellow-400 cursor-pointer" />
            <Linkedin className="w-6 h-6 text-white hover:text-yellow-400 cursor-pointer" />
          </div>

          {/* EMAIL INPUT */}
          <div className="flex items-center border border-yellow-400 rounded-full overflow-hidden max-w-sm">

            <div className="bg-yellow-400 px-4 py-3 text-black">
              <Mail size={18} />
            </div>

            <input
              type="text"
              placeholder="Masukkan email Anda"
              className="flex-1 bg-transparent px-4 py-3 text-sm outline-none"
            />
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