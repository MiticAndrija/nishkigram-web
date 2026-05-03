import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AnnouncementCard from "@/components/AnnouncementCard";
import FeatureCards from "@/components/FeatureCards";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4efe6] font-sans selection:bg-[#5c4a3d]/20">
      <Navbar />
      <main>
        <Hero />
        <div className="relative z-10 -mt-16">
          <AnnouncementCard />
          <FeatureCards />
        </div>
      </main>
    </div>
  );
}
