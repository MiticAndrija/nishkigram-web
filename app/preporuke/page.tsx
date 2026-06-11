import RecommendationSearch from "@/components/RecommendationSearch";
import Navbar from "@/components/Navbar";
import { getRecommendationCategories } from "@/lib/recommendationCategories";
import { getPublishedRecommendations } from "@/lib/recommendations";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Preporuke - Niskigram",
  description:
    "Niskigram preporuke: kafici, restorani, barovi i aktivnosti u Nisu. Otkrijte proverena lokalna mesta.",
};

export default async function PreporukePage() {
  const recommendations = await getPublishedRecommendations();
  const categories = await getRecommendationCategories();

  return (
    <div className="min-h-screen bg-[#f4efe6] font-sans selection:bg-[#5c4a3d]/20">
      <Navbar />
      <main className="pt-24">
        <section className="px-6 pb-16 pt-16 md:px-10 md:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-[#8b6f56]">
                Niskigram preporuke
              </p>
              <h1 className="font-serif text-5xl leading-tight text-[#4a382b] md:text-7xl">
                Proverena mesta koja volimo.
              </h1>
              <p className="mt-8 max-w-2xl text-xl leading-9 text-[#5c4a3d]/80">
                Biramo lokale, usluge i iskustva u Nisu koja vredi posetiti.
                Javna strana prikazuje preporuke koje su objavljene iz admin
                panela.
              </p>
            </div>

            {recommendations.length > 0 ? (
              <RecommendationSearch
                recommendations={recommendations}
                categories={categories}
              />
            ) : (
              <div className="mt-12 rounded-[1.5rem] border border-[#5c4a3d]/10 bg-[#fdfaf6] p-10 text-center">
                <h2 className="font-serif text-3xl text-[#4a382b]">
                  Jos nema objavljenih preporuka.
                </h2>
                <p className="mx-auto mt-4 max-w-xl leading-7 text-[#5c4a3d]/75">
                  Kada admin objavi prvu preporuku, pojavice se ovde kao javna
                  kartica sa slikom, kategorijom i opisom.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
