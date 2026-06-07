import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";




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

          </div>
        </section>
      </main>
    </div>
  );
}
