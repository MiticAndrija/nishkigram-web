import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-4 bg-[#fdfaf6]/80 backdrop-blur-md text-[#5c4a3d]">
      <div className="flex items-center gap-3">
        {/* Placeholder for the logo icon */}
        <div className="flex items-center justify-center w-10 h-10">
          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
            <path d="M12 2L8 10H16L12 2Z M8 10V22H16V10Z" />
          </svg>
        </div>
        <span className="text-2xl font-serif font-bold">Niškigram</span>
      </div>
      <div className="hidden md:flex items-center gap-8 font-medium">
        <Link href="#" className="hover:opacity-70 transition-opacity">
          O nama
        </Link>
        <Link href="#" className="hover:opacity-70 transition-opacity">
          Blog
        </Link>
        <Link href="#" className="hover:opacity-70 transition-opacity">
          Shop
        </Link>
      </div>
      <div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#5c4a3d]/20 hover:bg-[#5c4a3d]/5 transition-colors font-medium">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Search
        </button>
      </div>
    </nav>
  );
}
