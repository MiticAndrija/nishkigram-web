import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const products = [
  {
    name: "Niš panorama poster",
    category: "Poster",
    price: "Uskoro",
    description:
      "Topao gradski motiv za zid, inspirisan prepoznatljivim niškim horizontom.",
    image: "/images/nis-hero.png",
  },
  {
    name: "Majica \"Kod Konja\"",
    category: "Odeća",
    price: "Uskoro",
    description: "Minimalan lokalni znak na svakodnevnom komadu garderobe.",
    image: "/images/konjanik.png",
  },
  {
    name: "Set razglednica",
    category: "Papir",
    price: "Uskoro",
    description: "Tri mala gradska kadra za slanje, čuvanje ili poklon.",
    image: "/images/nis-hero.png",
  },
];

const steps = [
  "Pratimo prve reakcije publike.",
  "Biramo motive koji najviše liče na Niš.",
  "Pripremamo malu seriju proizvoda.",
];

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#f4efe6] font-sans selection:bg-[#5c4a3d]/20">
      <Navbar />
      <main className="pt-24">
        <section className="px-6 pb-16 pt-16 md:px-10 md:pb-24">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.95fr_1.05fr] md:items-center">
            <div>
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-[#8b6f56]">
                Niškigram shop
              </p>
              <h1 className="max-w-3xl font-serif text-5xl leading-tight text-[#4a382b] md:text-7xl">
                Lokalni motivi koji izlaze iz feeda.
              </h1>
              <p className="mt-8 max-w-2xl text-xl leading-9 text-[#5c4a3d]/80">
                Shop je zamišljen kao mala kolekcija proizvoda sa motivima Niša:
                posteri, majice, razglednice i predmeti koji nose prepoznatljiv
                gradski karakter.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="https://www.instagram.com/nishkigram/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-[#5c4a3d] px-7 py-4 text-base font-semibold text-[#fdfaf6] shadow-lg shadow-[#5c4a3d]/20 transition-all hover:-translate-y-0.5 hover:bg-[#47382f] focus:outline-none focus:ring-4 focus:ring-[#5c4a3d]/20"
                >
                  Pratite lansiranje
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-lg border border-[#5c4a3d]/25 px-7 py-4 text-base font-semibold text-[#5c4a3d] transition-colors hover:bg-[#5c4a3d]/8 focus:outline-none focus:ring-4 focus:ring-[#5c4a3d]/15"
                >
                  Nazad na početnu
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-[#fdfaf6] p-8 shadow-2xl">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#c88f55]/20 blur-3xl" />
              <div className="relative flex min-h-[380px] items-center justify-center rounded-[1.5rem] bg-[#e8e0d5]">
                <Image
                  src="/images/konjanik.png"
                  alt="Konjanik motiv za Niškigram proizvode"
                  width={300}
                  height={300}
                  className="h-56 w-56 object-contain drop-shadow-xl md:h-72 md:w-72"
                  priority
                />
              </div>
              <div className="relative mt-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b6f56]">
                    Prva kolekcija
                  </p>
                  <p className="mt-2 text-2xl font-serif text-[#4a382b]">
                    U pripremi
                  </p>
                </div>
                <span className="rounded-full bg-[#5c4a3d] px-4 py-2 text-sm font-semibold text-[#fdfaf6]">
                  Uskoro
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#fdfaf6] px-6 py-18 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <h2 className="font-serif text-4xl text-[#4a382b] md:text-5xl">
                  Kolekcija u najavi
                </h2>
                <p className="mt-5 text-lg leading-8 text-[#5c4a3d]/75">
                  Proizvodi još nisu otvoreni za kupovinu. Ova stranica
                  postavlja pravac shopa i ostavlja mesto za prvu seriju kada
                  bude spremna.
                </p>
              </div>
              <Link
                href="https://www.instagram.com/nishkigram/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center justify-center rounded-lg border border-[#5c4a3d]/25 px-6 py-3 font-semibold text-[#5c4a3d] transition-colors hover:bg-[#5c4a3d]/8"
              >
                Pitajte na Instagramu
              </Link>
            </div>

            <div className="mt-12 grid gap-7 md:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.name}
                  className="overflow-hidden rounded-[1.5rem] border border-[#5c4a3d]/10 bg-[#f4efe6]"
                >
                  <div className="relative h-64 bg-[#e8e0d5]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className={
                        product.image.includes("konjanik")
                          ? "object-contain p-10"
                          : "object-cover object-bottom"
                      }
                      unoptimized={product.image.includes("nis-hero")}
                    />
                  </div>
                  <div className="p-7">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b6f56]">
                        {product.category}
                      </span>
                      <span className="rounded-full bg-[#5c4a3d]/10 px-3 py-1 text-sm font-semibold text-[#5c4a3d]">
                        {product.price}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-[#4a382b]">
                      {product.name}
                    </h3>
                    <p className="mt-3 leading-7 text-[#5c4a3d]/75">
                      {product.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-18 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div>
              <h2 className="font-serif text-4xl text-[#4a382b] md:text-5xl">
                Mali shop, pažljivo birani motivi.
              </h2>
              <p className="mt-6 text-lg leading-9 text-[#5c4a3d]/80">
                Ne ciljamo veliku prodavnicu sa mnogo stvari. Ideja je da svaka
                serija ima jasan razlog, lokalni karakter i kvalitet koji ima
                smisla za poklon ili ličnu uspomenu.
              </p>
            </div>
            <div className="grid gap-4">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-5 rounded-[1.25rem] bg-[#fdfaf6] p-6 shadow-sm"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#5c4a3d] font-semibold text-[#fdfaf6]">
                    {index + 1}
                  </span>
                  <p className="text-lg font-medium text-[#5c4a3d]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
