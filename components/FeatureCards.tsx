import Image from "next/image";

const features = [
  {
    title: "O Nama",
    description: "Otkrijte više o nama i našoj misiji.",
    linkText: "Saznajte više",
    image: "/window.svg", // Using placeholder
  },
  {
    title: "Blog",
    description: "Najnovije vesti, priče i događaji iz Niša.",
    linkText: "Posetite blog",
    image: "/globe.svg", // Using placeholder
  },
  {
    title: "Shop",
    description: "Dostupni proizvodi sa motivima Niša.",
    linkText: "Istražite prodavnicu",
    image: "/file.svg", // Using placeholder
  },
];

export default function FeatureCards() {
  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 px-4">
      {features.map((feature, i) => (
        <div
          key={i}
          className="bg-[#fdfaf6] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-[#5c4a3d]/10 flex flex-col"
        >
          <div className="h-56 relative bg-[#e8e0d5] flex items-center justify-center p-8">
            <Image
              src={feature.image}
              alt={feature.title}
              width={100}
              height={100}
              className="opacity-50"
            />
          </div>
          <div className="p-8 flex flex-col flex-grow">
            <h3 className="text-3xl font-serif text-[#5c4a3d] mb-3">
              {feature.title}
            </h3>
            <p className="text-[#5c4a3d]/80 mb-6 flex-grow text-lg">
              {feature.description}
            </p>
            <a
              href="#"
              className="text-[#5c4a3d] font-semibold hover:underline flex items-center gap-2"
            >
              {feature.linkText}
              <svg
                className="w-4 h-4"
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
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
