import type { FooterLink } from './FooterLinkColumn';

import { Logo } from '../../branding/Logo';
import { FooterContactInfo } from './FooterContactInfo';
import { FooterLinkColumn } from './FooterLinkColumn';
import { NewsletterSignup } from '../../molecules/newsletter/NewsletterSignup';
import { FooterCopyright } from './FooterCopyright';

const menuLinks: FooterLink[] = [
  { href: '/nas-vyber', label: 'Náš výběr' },
  { href: '/produkty', label: 'Produkty' },
  { href: '/jak-to-funguje', label: 'Jak to funguje' },
  { href: '/kontakty', label: 'Kontakt' },
];

const recommendedLinks: FooterLink[] = [
  { href: '/koupit', label: 'Koupit' },
  { href: '/pronajmout', label: 'Pronajmout' },
  { href: '/akcni-vozy', label: 'Akční vozy' },
  { href: '/nas-vyber', label: 'Náš výběr' },
  { href: '/nejnovejsi-nabidky', label: 'Nejnovější nabídky' },
  { href: '/katalog', label: 'Katalog' },
];

const selectionLinks: FooterLink[] = [
  { href: '/premiove', label: 'Prémiové' },
  { href: '/mainstream', label: 'Mainstream' },
  { href: '/sportovni', label: 'Sportovní' },
  { href: '/elektromobily', label: 'Elektromobily' },
  { href: '/uzitkove', label: 'Užitkové' },
  { href: '/hybridni', label: 'Hybridní' },
  { href: '/skladove', label: 'Skladové' },
  { href: '/nas-vyber', label: 'Zobrazit vše' },
];

const brandLinks: FooterLink[] = [
  { href: '/znacky/audi', label: 'Audi' },
  { href: '/znacky/bmw', label: 'BMW' },
  { href: '/znacky/skoda', label: 'Škoda' },
  { href: '/znacky/hyundai', label: 'Hyundai' },
  { href: '/znacky/mazda', label: 'Mazda' },
  { href: '/znacky/mercedes', label: 'Mercedes' },
  { href: '/znacky/lexus', label: 'Lexus' },
  { href: '/znacky', label: 'Zobrazit vše' },
];

const categoryLinks: FooterLink[] = [
  { href: '/kategorie/suv', label: 'SUV' },
  { href: '/kategorie/kombi-mpv', label: 'Kombi / MPV' },
  { href: '/kategorie/hatchback', label: 'Hatchback' },
  { href: '/kategorie/sedan', label: 'Sedan' },
  { href: '/kategorie/kupe', label: 'Kupé' },
  { href: '/kategorie/kabriolet', label: 'Kabriolet' },
  { href: '/kategorie', label: 'Zobrazit vše' },
];

const Footer = () => {
  return (
    <footer className="rounded-t-[32px] bg-[#262D37] text-white ">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <NewsletterSignup />

        <div className="mb-6">
          <Logo height={34} width={170} />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-2">
            <FooterContactInfo />
          </div>

          <FooterLinkColumn className="lg:col-span-2" links={menuLinks} title="Menu" />
          <FooterLinkColumn className="lg:col-span-2" links={recommendedLinks} title="Doporučené" />
          <FooterLinkColumn className="lg:col-span-2" links={selectionLinks} title="Náš výběr" />
          <FooterLinkColumn className="lg:col-span-2" links={brandLinks} title="Značky" />
          <FooterLinkColumn className="lg:col-span-2" links={categoryLinks} title="Kategorie" />
        </div>

        <FooterCopyright />
      </div>
    </footer>
  );
};

export default Footer;
