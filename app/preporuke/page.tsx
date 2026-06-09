import Navbar from "@/components/Navbar";
import Link from "next/link";

const categories = [
  {
    id: "kafici",
    label: "Kafići",
    icon: "☕",
    description: "Najlepši kafići u Nišu za kafu, kolače i druženje.",
  },
  {
    id: "restorani",
    label: "Restorani",
    icon: "🍽️",
    description: "Lokalna i internacionalna kuhinja za svačiji ukus.",
  },
  {
    id: "barovi",
    label: "Barovi & Klubovi",
    icon: "🍸",
    description: "Najbolji noćni provod i kokteli u gradu.",
  },
  {
    id: "lepota",
    label: "Lepota & Wellness",
    icon: "✨",
    description: "Saloni, spa centri i mesta za opuštanje.",
  },
  {
    id: "aktivnosti",
    label: "Aktivnosti",
    icon: "🎯",
    description: "Zanimljive aktivnosti, ture i iskustva.",
  },
  {
    id: "kupovina",
    label: "Kupovina",
    icon: "🛍️",
    description: "Lokalne prodavnice i unikatni proizvodi.",
  },
];

const featuredPlaces = [
  {
    id: 1,
    name: "Kafeterija Nišlija",
    category: "kafici",
    tagline: "Specialty kafa u srcu grada",
    description:
      "Uživajte u ručno prženim zrnima i toploj atmosferi u centru Niša. Savršeno mesto za rad ili opušten razgovor.",
    address: "Obrenovićeva 15, Niš",
    instagram: "@kafeterija_nislija",
    featured: true,
    tags: ["Specialty kafa", "Kolači", "Wi-Fi"],
  },
  {
    id: 2,
    name: "Trattoria Bella Niš",
    category: "restorani",
    tagline: "Autentični italijanski ukusi",
    description:
      "Domaća pasta, pizza iz krušne peći i izvanredna vina. Idealno za romantičnu večeru ili porodični ručak.",
    address: "Nikole Pašića 28, Niš",
    instagram: "@trattoria_bellanis",
    featured: true,
    tags: ["Italijanska kuhinja", "Vino", "Terasa"],
  },
  {
    id: 3,
    name: "Cocktail Bar Neon",
    category: "barovi",
    tagline: "Kreativni kokteli i živa atmosfera",
    description:
      "Autorski kokteli, DJ setovi vikendom i unikatan ambijent koji spaja retro i moderno.",
    address: "Dušanova 42, Niš",
    instagram: "@neon_bar_nis",
    featured: false,
    tags: ["Kokteli", "Muzika", "Noćni život"],
  },
  {
    id: 4,
    name: "Studio Glow",
    category: "lepota",
    tagline: "Vaš kutak za lepotu i opuštanje",
    description:
      "Profesionalne usluge nege kose, lica i tela u modernom prostoru sa vrhunskim proizvodima.",
    address: "Voždova 8, Niš",
    instagram: "@studio_glow_nis",
    featured: false,
    tags: ["Frizerski salon", "Kozmetika", "Masaže"],
  },
  {
    id: 5,
    name: "Niš Adventure Tours",
    category: "aktivnosti",
    tagline: "Otkrijte Niš iz drugog ugla",
    description:
      "Pešačke ture, biciklizam i avanture u okolini Niša. Idealno za turiste i lokalne istraživače.",
    address: "Trg kralja Milana, Niš",
    instagram: "@nis_adventure",
    featured: true,
    tags: ["Ture", "Priroda", "Avantura"],
  },
  {
    id: 6,
    name: "Etno Dućan",
    category: "kupovina",
    tagline: "Unikatni suveniri i lokalni zanat",
    description:
      "Ručno rađeni suveniri, keramika i tekstil inspirisan niškim motivima. Savršen poklon iz Niša.",
    address: "Kazandžijsko sokače, Niš",
    instagram: "@etno_ducan_nis",
    featured: false,
    tags: ["Suveniri", "Zanat", "Pokloni"],
  },
];

export const metadata = {
  title: "Preporuke – Niškigram",
  description:
    "Niškigram preporuke: najboljie kafići, restorani, barovi i aktivnosti u Nišu. Otkrijte proverena lokalna mesta.",
};

export default function PreporukePage() {
  return (
    <div className="min-h-screen bg-[#f4efe6] font-sans selection:bg-[#5c4a3d]/20">
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 pb-16 pt-16 md:px-10 md:pb-24">
          {/* Decorative background elements */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#8b6f56]/5 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[#5c4a3d]/5 blur-3xl" />

          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-[#8b6f56]">
                Niškigram preporuke
              </p>
              <h1 className="font-serif text-5xl leading-tight text-[#4a382b] md:text-7xl">
                Proverena mesta koja volimo.
              </h1>
              <p className="mt-8 max-w-2xl text-xl leading-9 text-[#5c4a3d]/80">
                Biramo lokale, usluge i iskustva u Nišu koja vredi posetiti.
                Svaka preporuka je lično proverena i odabrana sa pažnjom.
              </p>
            </div>

            {/* Category Pills */}
            <div className="mt-12 flex flex-wrap gap-3">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-[#5c4a3d]/12 bg-[#fdfaf6] px-5 py-3 text-sm font-semibold text-[#5c4a3d] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#8b6f56]/30 hover:shadow-md"
                >
                  <span className="text-lg transition-transform group-hover:scale-110">
                    {cat.icon}
                  </span>
                  {cat.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Categories & Listings */}
        {categories.map((category) => {
          const places = featuredPlaces.filter(
            (p) => p.category === category.id,
          );
          if (places.length === 0) return null;

          return (
            <section
              key={category.id}
              id={category.id}
              className="scroll-mt-24 px-6 py-12 md:px-10 md:py-16 even:bg-[#fdfaf6]"
            >
              <div className="mx-auto max-w-6xl">
                <div className="mb-10 flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5c4a3d]/8 text-2xl">
                    {category.icon}
                  </span>
                  <div>
                    <h2 className="font-serif text-3xl text-[#4a382b] md:text-4xl">
                      {category.label}
                    </h2>
                    <p className="mt-1 text-[#5c4a3d]/65">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {places.map((place) => (
                    <article
                      key={place.id}
                      className={`group relative overflow-hidden rounded-[1.75rem] border bg-[#fdfaf6] p-8 transition-all hover:-translate-y-1 hover:shadow-xl ${
                        place.featured
                          ? "border-[#8b6f56]/25 shadow-lg ring-1 ring-[#8b6f56]/10"
                          : "border-[#5c4a3d]/10 shadow-md"
                      }`}
                    >
                      {/* Featured badge */}
                      {place.featured && (
                        <div className="absolute right-6 top-6 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#8b6f56] to-[#a6845e] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#fdfaf6] shadow-sm">
                          <svg
                            className="h-3 w-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          Istaknuto
                        </div>
                      )}

                      {/* Place header */}
                      <div className="mb-4">
                        <h3 className="font-serif text-2xl text-[#4a382b] transition-colors group-hover:text-[#8b6f56]">
                          {place.name}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-[#8b6f56]">
                          {place.tagline}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="mb-5 leading-7 text-[#5c4a3d]/75">
                        {place.description}
                      </p>

                      {/* Tags */}
                      <div className="mb-5 flex flex-wrap gap-2">
                        {place.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg bg-[#5c4a3d]/6 px-3 py-1 text-xs font-semibold text-[#5c4a3d]/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Info Row */}
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#5c4a3d]/8 pt-5 text-sm text-[#5c4a3d]/70">
                        <span className="inline-flex items-center gap-1.5">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {place.address}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {place.instagram}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* CTA for businesses */}
        <section className="px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#5c4a3d]/10 bg-gradient-to-br from-[#5c4a3d] via-[#47382f] to-[#3a2c23] p-10 text-center shadow-2xl md:p-16">
              {/* Decorative glow */}
              <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-[#8b6f56]/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-[#a6845e]/15 blur-3xl" />

              <div className="relative">
                <span className="mb-5 inline-block text-4xl">📍</span>
                <h2 className="font-serif text-3xl text-[#fdfaf6] md:text-5xl">
                  Želite da se vaš lokal nađe ovde?
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#fdfaf6]/75">
                  Niškigram preporuke vidi hiljade ljudi mesečno. Pišite nam na
                  Instagram i saznajte kako da vaše mesto bude deo našeg vodiča.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="https://www.instagram.com/nishkigram/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#fdfaf6] px-8 py-4 text-base font-bold text-[#4a382b] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                    Pišite nam na Instagram
                  </Link>
                  <Link
                    href="/o-nama"
                    className="inline-flex items-center justify-center rounded-xl border border-[#fdfaf6]/25 px-8 py-4 text-base font-semibold text-[#fdfaf6] transition-colors hover:bg-[#fdfaf6]/10"
                  >
                    Više o nama
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
