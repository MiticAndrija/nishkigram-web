"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

const searchItems = [
  {
    title: "O nama",
    description: "Saznajte vise o Niskigramu i nasoj misiji.",
    href: "/o-nama",
    keywords: "o nama niskigram misija",
  },
  {
    title: "Blog",
    description: "Najnovije vesti, price i dogadjaji iz Nisa.",
    href: "/blog",
    keywords: "blog vesti price dogadjaji nis",
  },
  {
    title: "Preporuke",
    description: "Proverena mesta u Nisu: kafici, restorani, barovi i vise.",
    href: "/preporuke",
    keywords: "preporuke kafici restorani barovi mesta nis",
  },
  {
    title: "Instagram",
    description: "Otvorite @nishkigram profil.",
    href: "https://www.instagram.com/nishkigram/",
    keywords: "instagram nishkigram profil",
  },
];

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const isAboutPage = pathname === "/o-nama";

  useEffect(() => {
    if (!isSearchOpen) {
      return;
    }

    inputRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return searchItems;
    }

    return searchItems.filter((item) =>
      `${item.title} ${item.description} ${item.keywords}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (results[0]) {
      window.location.href = results[0].href;
      setIsSearchOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 z-50 grid w-full grid-cols-[1fr_auto_1fr] items-center px-8 py-4 bg-[#fdfaf6]/80 backdrop-blur-md text-[#5c4a3d]">
      <Link
        href="/"
        aria-label="Niškigram početna"
        className="flex items-center gap-3 justify-self-start hover:opacity-80 transition-opacity"
      >
        {/* Placeholder for the logo icon */}
        <div className="flex items-center justify-center w-10 h-10">
          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
            <path d="M12 2L8 10H16L12 2Z M8 10V22H16V10Z" />
          </svg>
        </div>
        <span className="text-2xl font-serif font-bold">Niškigram</span>
      </Link>
      <div className="hidden md:flex items-center gap-8 font-medium justify-self-center">
        <Link
          href={isAboutPage ? "/" : "/o-nama"}
          className="hover:opacity-70 transition-opacity"
        >
          {isAboutPage ? "Početna" : "O nama"}
        </Link>
        <Link href="/blog" className="hover:opacity-70 transition-opacity">
          Blog
        </Link>
        <Link href="/preporuke" className="hover:opacity-70 transition-opacity">
          Preporuke
        </Link>
      </div>
      <div className="justify-self-end">
        <button
          type="button"
          aria-label="Otvori pretragu"
          onClick={() => setIsSearchOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#5c4a3d]/20 hover:bg-[#5c4a3d]/5 transition-colors"
        >
          <svg
            className="w-5 h-5"
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
        </button>
      </div>

      {isSearchOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-[#2f241d]/35 px-4 pt-24 backdrop-blur-sm"
          onMouseDown={() => setIsSearchOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Pretraga sajta"
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[#5c4a3d]/15 bg-[#fdfaf6] shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-3 border-b border-[#5c4a3d]/10 px-5 py-4"
            >
              <svg
                className="h-5 w-5 shrink-0 text-[#5c4a3d]/70"
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
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Pretrazi Niskigram..."
                className="min-w-0 flex-1 bg-transparent text-lg text-[#4a382b] outline-none placeholder:text-[#5c4a3d]/45"
              />
              <button
                type="button"
                aria-label="Zatvori pretragu"
                onClick={() => setIsSearchOpen(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-[#5c4a3d]/10 transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </form>
            <div className="max-h-[60vh] overflow-y-auto p-3">
              {results.length > 0 ? (
                results.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    onClick={() => setIsSearchOpen(false)}
                    className="block rounded-xl px-4 py-3 transition-colors hover:bg-[#5c4a3d]/8"
                  >
                    <span className="block font-semibold text-[#4a382b]">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm text-[#5c4a3d]/70">
                      {item.description}
                    </span>
                  </a>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-[#5c4a3d]/70">
                  Nema rezultata za &quot;{query}&quot;.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
