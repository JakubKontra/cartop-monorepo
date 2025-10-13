import Benefits from '@/components/organisms/Benefits/Benefits';
import Footer from '@/components/organisms/Footer/Footer';
import { Hero } from '@/components/organisms/Hero/Hero';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { FaqSection } from '@/components/sections/Homepage/Faq/FaqSection';

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
