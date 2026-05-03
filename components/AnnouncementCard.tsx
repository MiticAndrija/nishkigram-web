export default function AnnouncementCard() {
  return (
    <div className="relative z-20 w-full max-w-5xl mx-auto -mt-[250px] mb-16 px-4">
      <div className="bg-[#fdfaf6]/90 backdrop-blur-xl rounded-[2rem] p-16 flex flex-col items-center text-center shadow-2xl border border-white/60 relative overflow-hidden">
        {/* Soft decorative blur */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/40 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#5c4a3d]/5 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

        <div className="relative z-10">
          <h2 className="text-5xl font-serif text-[#5c4a3d] mb-6">Sajt je u izradi.</h2>
          <p className="text-2xl text-[#5c4a3d]/80 mb-10 font-medium">Uskoro...</p>
          <a
            href="https://www.instagram.com/nishkigram/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-3.5 bg-[#fdfaf6] text-[#5c4a3d] text-lg font-semibold rounded-full shadow-md hover:shadow-lg transition-all border border-[#5c4a3d]/15 hover:bg-[#5c4a3d] hover:text-[#fdfaf6]"
          >
            Posetite instagram stranicu!
          </a>
        </div>
      </div>
    </div>
  );
}
