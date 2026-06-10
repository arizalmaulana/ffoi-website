"use client";

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const subject = (form.elements.namedItem("subject") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    const body = `
Nama: ${name}
Email: ${email}

Pesan:
${message}
    `;

    window.location.href =
      `mailto:info@ffoi.or.id?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        {/* Nama & Email Grid (di layar besar sejajar) */}
        <div className="grid md:grid-cols-2 gap-6">
        <div>
            <label className="sr-only">Nama Lengkap</label>
            <input 
            name="name"
            type="text" 
            placeholder="Nama Lengkap" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:bg-white/10 transition-all"
            />
        </div>
        <div>
            <label className="sr-only">Email</label>
            <input 
            name="email"
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
            name="subject"
            type="text" 
            placeholder="Subjek" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:bg-white/10 transition-all"
        />
        </div>

        {/* Pesan */}
        <div>
        <label className="sr-only">Pesan</label>
        <textarea 
            name="message"
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z"></path>
        </svg>
        Send Message
        </button>
    </form>
  );
}