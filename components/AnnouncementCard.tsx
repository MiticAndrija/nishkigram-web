export default function AnnouncementCard() {
  return (
    <div className="relative z-20 mx-auto -mt-56 mb-12 w-full max-w-5xl px-4 sm:-mt-[250px] sm:mb-16">
      <div className="relative flex flex-col items-center overflow-hidden rounded-3xl border border-white/60 bg-[#fdfaf6]/90 p-6 text-center shadow-2xl backdrop-blur-xl sm:rounded-[2rem] sm:p-16">
        <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-orange-100/40 blur-3xl sm:h-64 sm:w-64 -mr-16 -mt-16" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[#5c4a3d]/5 blur-3xl sm:h-64 sm:w-64 -ml-16 -mb-16" />

        <div className="relative z-10 w-full">
          <h2 className="font-serif text-4xl leading-tight text-[#5c4a3d] sm:text-5xl">
            Sajt je u izradi.
          </h2>
          <p className="mb-8 mt-4 text-xl font-medium text-[#5c4a3d]/80 sm:mb-10 sm:text-2xl">
            Uskoro...
          </p>
          <a
            href="https://www.instagram.com/nishkigram/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 max-w-full items-center justify-center gap-3 rounded-lg bg-[#5c4a3d] px-5 py-3 text-base font-semibold text-[#fdfaf6] shadow-lg shadow-[#5c4a3d]/20 transition-all hover:-translate-y-0.5 hover:bg-[#47382f] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#5c4a3d]/20 sm:px-8 sm:py-4 sm:text-lg"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#fdfaf6]/15 text-xl">
              @
            </span>
            <span className="min-w-0">Posetite Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
}
