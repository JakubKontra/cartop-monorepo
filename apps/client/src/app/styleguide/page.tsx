import Benefits from "@/components/organisms/Benefits/Benefits";
import { Hero } from "@/components/organisms/Hero/Hero";
import Navbar from "@/components/organisms/Navbar/Navbar";
import Footer from "@/components/organisms/Footer";
import { FAQSection } from "@/components/sections/FAQSection";

export default function Styleguide() {
  return (
   <div>
    <Navbar />
    <Hero />
    <Benefits />
    <FAQSection />
    <Footer />
  </div>
  );
}
