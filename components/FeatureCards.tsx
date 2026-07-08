import Image from "next/image";
import Link from "next/link";

const features = [
  {
    id: "o-nama",
    title: "O Nama",
    description: "Otkrijte više o nama i našoj misiji.",
    linkText: "Saznajte više",
    href: "/o-nama",
    image: "/window.svg",
  },
  {
    id: "blog",
    title: "Blog",
    description: "Najnovije vesti, priče i događaji iz Niša.",
    linkText: "Posetite blog",
    href: "/blog",
    image: "/globe.svg",
  },
  {
    id: "preporuke",
    title: "Preporuke",
    description: "Proverena mesta u Nišu: kafići, restorani i više.",
    linkText: "Pogledajte preporuke",
    href: "/preporuke",
    image: "/globe.svg",
  },
];

export default function FeatureCards() {
  return (
    <div className="mx-auto mb-16 grid w-full max-w-5xl grid-cols-1 gap-5 px-4 md:mb-24 md:grid-cols-3 md:gap-8">
      {features.map((feature) => (
        <div
          key={feature.id}
          id={feature.id}
          className="flex min-w-0 flex-col overflow-hidden rounded-3xl border border-[#5c4a3d]/10 bg-[#fdfaf6] shadow-lg transition-shadow hover:shadow-xl md:rounded-[2rem]"
        >
          <div className="relative flex h-40 items-center justify-center bg-[#e8e0d5] p-6 sm:h-48 md:h-56 md:p-8">
            <Image
              src={feature.image}
              alt={feature.title}
              width={100}
              height={100}
              className="h-20 w-20 opacity-50 sm:h-24 sm:w-24"
            />
          </div>
          <div className="flex flex-grow flex-col p-6 md:p-8">
            <h3 className="mb-3 font-serif text-2xl leading-tight text-[#5c4a3d] md:text-3xl">
              {feature.title}
            </h3>
            <p className="mb-5 flex-grow text-base leading-7 text-[#5c4a3d]/80 md:mb-6 md:text-lg">
              {feature.description}
            </p>
            <Link
              href={feature.href}
              className="flex min-h-11 items-center gap-2 font-semibold text-[#5c4a3d] hover:underline"
            >
              <span>{feature.linkText}</span>
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
