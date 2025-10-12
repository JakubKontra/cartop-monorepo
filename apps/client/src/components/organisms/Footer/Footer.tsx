import { Logo } from "../../branding/Logo"
import { NewsletterSignup } from "../../molecules/NewsletterSignup"
import { FooterContactInfo } from "../../molecules/FooterContactInfo"
import { FooterLinkColumn, FooterLink } from "../../molecules/FooterLinkColumn"
import { FooterCopyright } from "./FooterCopyright"

const menuLinks: FooterLink[] = [
  { href: "/nas-vyber", label: "Náš výběr" },
  { href: "/produkty", label: "Produkty" },
  { href: "/jak-to-funguje", label: "Jak to funguje" },
  { href: "/kontakt", label: "Kontakt" },
]

const recommendedLinks: FooterLink[] = [
  { href: "/koupit", label: "Koupit" },
  { href: "/pronajmout", label: "Pronajmout" },
  { href: "/akcni-vozy", label: "Akční vozy" },
  { href: "/nas-vyber", label: "Náš výběr" },
  { href: "/nejnovejsi-nabidky", label: "Nejnovější nabídky" },
]

const selectionLinks: FooterLink[] = [
  { href: "/premiove", label: "Prémiové" },
  { href: "/mainstream", label: "Mainstream" },
  { href: "/sportovni", label: "Sportovní" },
  { href: "/elektromobily", label: "Elektromobily" },
  { href: "/uzitkove", label: "Užitkové" },
  { href: "/hybridni", label: "Hybridní" },
  { href: "/skladove", label: "Skladové" },
  { href: "/nas-vyber", label: "Zobrazit vše" },
]

const brandLinks: FooterLink[] = [
  { href: "/znacky/audi", label: "Audi" },
  { href: "/znacky/bmw", label: "BMW" },
  { href: "/znacky/skoda", label: "Škoda" },
  { href: "/znacky/hyundai", label: "Hyundai" },
  { href: "/znacky/mazda", label: "Mazda" },
  { href: "/znacky/mercedes", label: "Mercedes" },
  { href: "/znacky/lexus", label: "Lexus" },
  { href: "/znacky", label: "Zobrazit vše" },
]

const categoryLinks: FooterLink[] = [
  { href: "/kategorie/suv", label: "SUV" },
  { href: "/kategorie/kombi-mpv", label: "Kombi / MPV" },
  { href: "/kategorie/hatchback", label: "Hatchback" },
  { href: "/kategorie/sedan", label: "Sedan" },
  { href: "/kategorie/kupe", label: "Kupé" },
  { href: "/kategorie/kabriolet", label: "Kabriolet" },
  { href: "/kategorie", label: "Zobrazit vše" },
]

export default function Footer() {
  return (

    <footer className="bg-[#262D37] text-white rounded-t-[32px] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <NewsletterSignup />

        <div className="mb-6">
          <Logo width={170} height={34} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <FooterContactInfo />
          </div>

          <FooterLinkColumn title="Menu" links={menuLinks} className="lg:col-span-2" />
          <FooterLinkColumn title="Doporučené" links={recommendedLinks} className="lg:col-span-2" />
          <FooterLinkColumn title="Náš výběr" links={selectionLinks} className="lg:col-span-2" />
          <FooterLinkColumn title="Značky" links={brandLinks} className="lg:col-span-2" />
          <FooterLinkColumn title="Kategorie" links={categoryLinks} className="lg:col-span-1" />
        </div>

        <FooterCopyright />
      </div>
    </footer>
  )
}
