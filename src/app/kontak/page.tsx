import Link from 'next/link';
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaMailBulk,
  FaGlobe,
  FaMapMarker,
} from "react-icons/fa";

export default function KontakPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[450px] flex flex-col justify-center overflow-hidden text-white">
        {/* Background Image (Ganti path sesuai gambar Anda) */}
        <img
          src="/kontak/kt7.jpeg" 
          alt="FFOI Contact Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay & Gradasi */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs md:text-sm font-semibold mb-4">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Beranda
            </Link>
            <span className="text-yellow-400">›</span>
            <span className="text-yellow-400">Kontak</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mt-2 mb-6 tracking-wide uppercase">
            HUBUNGI KAMI
          </h1>
          
          <p className="text-yellow-400 md:text-lg leading-relaxed max-w-2xl font-medium mb-4">
            Mari berkolaborasi untuk melindungi ikan asli Indonesia dan ekosistem perairannya.
          </p>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
            Jika anda memiliki pertanyaan, ide, kerja sama, peluang penelitian, atau ingin mendukung program konservasi kami, jangan ragu untuk menghubungi tim FFOI.
          </p>
        </div>
      </section>

      {/* ================= CONTACT INFO & FORM ================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="grid lg:grid-cols-[1fr_1.8fr] gap-16 lg:gap-24 items-start">
          
          {/* KIRI: INFORMASI KONTAK (Minimalist Style) */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4 uppercase tracking-wider">
                Informasi Kontak
              </h2>
            </div>

            {/* Lokasi */}
            <div className="flex gap-5 items-start group">
              <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/20 transition-colors">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-white">Lokasi</h3>
                <p className="text-gray-400">Indonesia</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-5 items-start group">
              <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/20 transition-colors">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-white">Email</h3>
                <a href="mailto:info@ffoi.or.id" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  info@ffoi.or.id
                </a>
              </div>
            </div>

            {/* Facebook */}
            <div className="flex gap-5 items-start group">
              <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/20 transition-colors">
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-white">Facebook</h3>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Freshwater Fish of Indonesia
                </a>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex gap-5 items-start group">
              <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/20 transition-colors">
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-white">LinkedIn</h3>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Freshwater Fish of Indonesia
                </a>
              </div>
            </div>
          </div>

          {/* KANAN: FORM (Clean & Minimalist Glassmorphism) */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <h2 className="text-2xl font-bold text-yellow-400 mb-8 uppercase tracking-wide">
              Kirim Pesan
            </h2>
            
            <form className="space-y-6 relative z-10">
              {/* Nama & Email Grid (di layar besar sejajar) */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="sr-only">Nama Lengkap</label>
                  <input 
                    type="text" 
                    placeholder="Nama Lengkap" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:bg-white/10 transition-all"
                  />
                </div>
                <div>
                  <label className="sr-only">Email</label>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:bg-white/10 transition-all"
                  />
                </div>
              </div>

              {/* Subjek */}
              <div>
                <label className="sr-only">Subjek</label>
                <input 
                  type="text" 
                  placeholder="Subjek" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:bg-white/10 transition-all"
                />
              </div>

              {/* Pesan */}
              <div>
                <label className="sr-only">Pesan</label>
                <textarea 
                  placeholder="Pesan Anda..." 
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:bg-white/10 transition-all resize-none"
                ></textarea>
              </div>

              {/* Tombol Kirim */}
              <button 
                type="submit"
                className="group w-full md:w-auto flex items-center justify-center gap-3 bg-yellow-400 text-black font-bold px-8 py-4 rounded-full transition-all duration-300 hover:bg-yellow-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] active:scale-95"
              >
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send Message
              </button>
            </form>
            
            {/* Dekorasi halus di background form */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
          </div>
          
        </div>
      </section>

      {/* ================= BOTTOM GRID (4 FOCUS AREAS) ================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24 pt-10 border-t border-white/10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Penelitian */}
          <div className="group border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center bg-[#0a0a0a] transition-colors hover:border-yellow-400/50">
            <svg className="w-14 h-14 text-yellow-400 mb-6 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
            <h3 className="font-bold text-white mb-3 text-lg">Penelitian</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Kolaborasi riset biodiversitas dan konservasi</p>
          </div>

          {/* Konservasi */}
          <div className="group border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center bg-[#0a0a0a] transition-colors hover:border-yellow-400/50">
            <svg className="w-14 h-14 text-yellow-400 mb-6 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
            <h3 className="font-bold text-white mb-3 text-lg">Konservasi</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Program perlindungan habitat dan spesies</p>
          </div>

          {/* Edukasi */}
          <div className="group border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center bg-[#0a0a0a] transition-colors hover:border-yellow-400/50">
            <svg className="w-14 h-14 text-yellow-400 mb-6 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
            <h3 className="font-bold text-white mb-3 text-lg">Edukasi</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Kegiatan edukasi di sekolah, workshop, dan pelatihan.</p>
          </div>

          {/* Kemitraan */}
          <div className="group border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center bg-[#0a0a0a] transition-colors hover:border-yellow-400/50">
            <svg className="w-14 h-14 text-yellow-400 mb-6 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
            <h3 className="font-bold text-white mb-3 text-lg">Kemitraan</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Kolaborasi antar NGO, Pemerintah, dan Stakeholder</p>
          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
          <footer className="bg-black text-white pt-20 px-6 md:px-16 border-white/10 max-w-7xl mx-auto pb-24 border-t">
      
            {/* COPYRIGHT */}
            <div className="text-center text-gray-500 text-xs py-6">
              2026 Yayasan Freshwater Fish of Indonesia (FFOI). All rights reserved.
            </div>
      
          </footer>

    </main>
  );
}