import Footer from '@/components/organisms/Footer';
import Navbar from '@/components/organisms/Navbar/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="w-full py-10">
        <div className="mx-auto mb-4 flex max-w-[1360px] flex-col gap-4 px-4 lg:flex-row lg:gap-8">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
