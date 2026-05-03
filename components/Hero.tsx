import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pb-64">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[#e8e0d5]">
        <Image
          src="/images/nis-hero.png"
          alt="Niš City"
          fill
          sizes="100vw"
          className="object-cover object-bottom"
          priority
          unoptimized={true}
        />
        {/* Gradient only fades at the very bottom to let the image show completely */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent via-70% to-[#f4efe6]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-row items-center justify-center text-center -mt-32">
        <h1 className="text-7xl md:text-9xl font-serif text-[#4a382b] drop-shadow-sm tracking-wide -mr-4 md:-mr-8">
          Nišk
        </h1>
        <div className="-mx-6 md:-mx-12 drop-shadow-md z-10">
          <Image
            src="/images/konjanik.png"
            alt="Konjanik"
            width={240}
            height={240}
            className="h-32 w-32 md:h-48 md:w-48 object-contain"
            loading="eager"
          />
        </div>
        <h1 className="text-7xl md:text-9xl font-serif text-[#4a382b] drop-shadow-sm tracking-wide -ml-2 md:-ml-4">
          gram
        </h1>
      </div>
    </section>
  );
}
