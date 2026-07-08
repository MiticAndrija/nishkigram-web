import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex min-h-[720px] w-full flex-col items-center justify-center overflow-hidden pb-44 sm:min-h-screen sm:pb-64">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent via-70% to-[#f4efe6]" />
      </div>

      <div className="relative z-10 -mt-28 flex w-full max-w-full flex-row items-center justify-center px-3 text-center sm:-mt-32">
        <h1 className="-mr-2 font-serif text-[clamp(2.7rem,13vw,4.5rem)] leading-none tracking-wide text-[#4a382b] drop-shadow-sm md:-mr-8 md:text-9xl">
          Nišk
        </h1>
        <div className="z-10 -mx-4 drop-shadow-md md:-mx-12">
          <Image
            src="/images/konjanik.png"
            alt="Konjanik"
            width={240}
            height={240}
            className="h-20 w-20 object-contain sm:h-32 sm:w-32 md:h-48 md:w-48"
            loading="eager"
          />
        </div>
        <h1 className="-ml-1 font-serif text-[clamp(2.7rem,13vw,4.5rem)] leading-none tracking-wide text-[#4a382b] drop-shadow-sm md:-ml-4 md:text-9xl">
          gram
        </h1>
      </div>
    </section>
  );
}
