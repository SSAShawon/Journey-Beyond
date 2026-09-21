import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import WorldStatement from "@/components/world/WorldStatement";
import WorldMap from "@/components/world/WorldMap";
import DestinationShowcase from "@/components/destinations/DestinationShowcase";
import JourneyTimeline from "@/components/journey/JourneyTimeline";
import LuxuryStay from "@/components/stay/LuxuryStay";
import TasteExperience from "@/components/taste/TasteExperience";
import PackYourBag from "@/components/packing/PackYourBag";
import TravelerTypes from "@/components/traveler/TravelerTypes";
import FinalCTA from "@/components/cta/FinalCTA";
import Footer from "@/components/layout/Footer";
import dynamic from "next/dynamic";


export default function Home() {
  return (
    <main className="bg-[#07111f]">
      <Navbar />

      <Hero />
      <WorldStatement />
      <WorldMap />
      
      <DestinationShowcase />
      <JourneyTimeline />
      <LuxuryStay />
      <TasteExperience />
      <PackYourBag />
      <TravelerTypes />
      <FinalCTA />
      <Footer />
      
    </main>
  );
}