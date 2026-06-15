import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaMailBulk,
  FaGlobe,
  FaMapMarker,
} from "react-icons/fa";

import Link from "next/link";

import HomepageDatabase
from "@/components/home/HomepageDatabase";

import {
  getHomepageSpecies,
} from "@/services/public-database.service";

async function getSightings() {
  const supabase = await createClient();

  const { data } = await supabase
      .from("sighting")
      .select("*")
      .order(
        "dibuat_pada",
        {
          ascending: false,
        }
      )
      .limit(6);

  return data || [];
}

export default async function Home() {

  const [
    data,
    homepageSpecies,
  ] = await Promise.all([
    getSightings(),
    getHomepageSpecies(),
  ]);

  return (
    <main>

      {/* HERO */}
      <section className="relative min-h-screen bg-black text-white overflow-hidden">

        {/* Mobile Background */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/images/Cover-pertama.PNG"
            alt="Cover FFOI"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Desktop Image */}
        <div className="hidden md:block absolute top-0 right-0 h-full w-[55%]">
          <Image
            src="/images/Cover-pertama.PNG"
            alt="Cover FFOI"
            fill
            priority
            className="object-cover object-center"
          />

          {/* Blend ke area text */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black" />
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="w-full md:w-[45%] px-6 sm:px-10 md:px-20 py-20">

            <p className="text-yellow-400 font-semibold mb-3">
              YAYASAN FFOI
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
              KENALI DAN <br />
              LINDUNGI <br />
              <span className="text-yellow-400">
                IKAN ASLI <br />
                INDONESIA
              </span>
            </h1>

            <p className="mt-6 max-w-md text-gray-300 text-base md:text-lg">
              Kami berkomitmen untuk penelitian, konservasi, dan edukasi ikan dan
              biota perairan asli Indonesia serta pengembangan perikanan lokal
              berkelanjutan demi keberlanjutan biodiversitas perairan Indonesia.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                href="/program"
                className="group relative bg-yellow-400 text-black px-6 sm:px-8 py-3.5 rounded-full font-bold inline-flex items-center gap-2 overflow-hidden transition-all duration-300 ease-out hover:bg-yellow-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.5)] hover:-translate-y-1 active:translate-y-0 active:scale-95"
              >
                <span>JELAJAHI PROGRAM</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>

              <a
                href="https://youtube.com/@ffoi.ikanindonesia?si=6SpYuiAdPxIsGcJn"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/5 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3.5 rounded-full font-bold inline-flex items-center gap-3 transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:-translate-y-1 active:translate-y-0 active:scale-95"
              >
                <svg
                  className="w-5 h-5 text-yellow-400 transition-transform duration-300 group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>

                <span>TONTON VIDEO</span>
              </a>

            </div>

          </div>
        </div>

      </section>

      {/* ================= SECTION 2 ================= */}
      <section className="bg-[#f3f3f3] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[95vh]">

          {/* IMAGE - Mobile atas, Desktop kanan */}
          <div className="relative h-[300px] sm:h-[400px] md:h-auto md:order-2">
            <Image
              src="/images/Foto berkontribusi untuk masa depan perairan Indonesia.JPG"
              alt="Kegiatan FFOI"
              fill
              priority
              className="object-cover"
            />

            {/* Gradient desktop */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#f3f3f3]" />
          </div>

          {/* TEXT - Mobile bawah, Desktop kiri */}
          <div className="flex items-center px-6 sm:px-10 md:px-20 py-12 md:py-16 md:order-1">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-black">
                BERKONTRIBUSI UNTUK <br />
                MASA DEPAN PERAIRAN <br />
                INDONESIA
              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed max-w-lg">
                FFOI adalah organisasi konservasi independen yang berfokus pada
                penelitian, dokumentasi, dan perlindungan ikan asli serta ekosistem
                Air Tawar Indonesia.
              </p>

              <p className="text-gray-700 mb-10 leading-relaxed max-w-lg">
                Melalui pendekatan berbasis sains, kolaborasi, edukasi, dan
                pemberdayaan masyarakat, kami memastikan bahwa kekayaan hayati
                Indonesia tetap lestari untuk generasi mendatang.
              </p>

              <Link
                href="/tentang"
                className="inline-block border border-yellow-500 text-black px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 hover:text-white transition"
              >
                SELENGKAPNYA →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ================= FOKUS KAMI ================= */}
      <section className="bg-black text-white py-16 md:py-24 px-6 sm:px-10">
        {/* TITLE */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 mb-12 sm:mb-20 px-2">
          <div className="hidden sm:block h-[2px] w-16 sm:w-24 bg-yellow-500 sm:mr-6"></div>
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-500 tracking-[0.15em] sm:tracking-[0.2em] text-center">
            FOKUS KAMI
          </h2>
          <div className="hidden sm:block h-[2px] w-16 sm:w-24 bg-yellow-500 sm:ml-6"></div>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-4">
          {[
            {
              // Icon Penelitian (Tabung Reaksi Sains)
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-yellow-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              ),
              title: "PENELITIAN",
              desc: "Studi ilmiah untuk memahami biodiversitas ikan dan ekosistem perairan Air Tawar Indonesia",
            },
            {
              // Icon Konservasi (Perisai/Perlindungan)
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-yellow-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              ),
              title: "KONSERVASI",
              desc: "Melindungi spesies ikan asli dan habitat perairan yang terancam melalui aksi nyata di lapangan",
            },
            {
              // Icon Edukasi (Topi Toga Akademik)
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-yellow-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              ),
              title: "EDUKASI",
              desc: "Meningkatkan kesadaran dan pengetahuan melalui program edukasi dan publikasi ilmiah",
            },
            {
              // Icon Perikanan Berkelanjutan (Siklus Recycle)
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-yellow-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              ),
              title: "PERIKANAN BERKELANJUTAN",
              desc: "Mendukung pengembangan perikanan lokal yang ramah lingkungan dan berkelanjutan",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative px-6 md:px-10 flex flex-col items-center text-center min-h-[300px]"
            >
              {/* ICON WRAPPER (h-24 memastikan tinggi ruang selalu konstan) */}
              <div className="h-24 flex items-center justify-center mb-4">
                {item.icon}
              </div>

              {/* TITLE (h-12 memastikan baris judul konstan meskipun beda panjang teks) */}
              <div className="h-12 flex items-center">
                <h3 className="font-bold tracking-wide">
                  {item.title}
                </h3>
              </div>

              {/* DESC */}
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
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            PROGRAM UNGGULAN
          </h2>

          <Link
            href="/program"
            className="text-black font-semibold hover:opacity-70 transition text-sm sm:text-base whitespace-nowrap"
          >
            LIHAT SEMUA PROGRAM →
          </Link>
        </div>

        {/* CARD LIST */}
        <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">

          {[
            {
              image: "/image/Ekspedisi.jpg",
              title: "Ekspedisi Perairan Indonesia",
              desc: "Eksplorasi ilmiah untuk mendokumentasikan keanekaragaman ikan air tawar di berbagai wilayah Indonesia.",
            },
            {
              image: "/image/Konservasi.jpg",
              title: "Konservasi Habitat Perairan",
              desc: "Melindungi ekosistem perairan dan habitat unik yang menjadi rumah bagi spesies endemik dan native.",
            },
            {
              image: "/images/series.png",
              title: "Series Buku dan Jurnal Indonesia",
              desc: "Publikasi jurnal dan buku untuk mendokumentasikan ikan Indonesia secara komprehensif.",
            },
            {
              image: "/image/Edukasi.jpg",
              title: "Inisiasi Edukasi Perairan Tawar",
              desc: "Program edukasi dan pelatihan untuk meningkatkan kesadaran tentang biodiversitas perairan.",
            },
            {
              image:
                "/images/Foto berkontribusi untuk masa depan perairan Indonesia.JPG",
              title: "Perikanan Berkelanjutan",
              desc: "Bersama masyarakat lokal untuk mengembangkan praktik perikanan berkelanjutan.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-black rounded-2xl overflow-hidden flex-none w-[300px] shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              {/* IMAGE */}
              <div className="relative h-[220px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-white mb-3 line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= DATABASE IKAN ================= */}
        <HomepageDatabase
          data={homepageSpecies}
        />

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
        <div className="bg-yellow-400 flex items-center px-6 sm:px-10 md:px-16 py-12 md:py-0">

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

            <Link
              href="/program#cara-kerja"
              className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              PELAJARI CARA KAMI BEKERJA
            </Link>

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

        <a href="https://wa.me/6282148579794" className="bg-yellow-400 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-300 transition">
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