import Benefits from '@/components/organisms/Benefits/Benefits';
import Footer from '@/components/organisms/Footer';
import { Hero } from '@/components/organisms/Hero/Hero';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { FaqSection } from '@/components/sections/FaqSection';

export default function Styleguide() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Benefits />
      <FaqSection />
      <Footer />
    </div>
  );
}
