import Link from "next/link"
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import { Logo } from "../branding/Logo"

// Custom X/Twitter icon since lucide-react's Twitter icon might be outdated
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-[#262D37] text-white rounded-t-[32px] ">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="bg-gray-100 rounded-3xl p-6 lg:p-8 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-gray-900 text-2xl lg:text-3xl font-bold mb-2">
                Chcete dostávat <span className="text-[#c8102e]">TOP nabídky?</span>
              </h2>
              <p className="text-gray-700 text-sm lg:text-base">
                Výběr nejzajímavějších vozů vám zašleme přímo do e-mailu.
              </p>
            </div>
            <div className="flex-1 lg:max-w-md">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Zadejte svůj email"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c8102e] focus:border-transparent"
                />
                <button className="bg-[#c8102e] hover:bg-[#a00d25] text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap">
                  Přihlásit odběr
                </button>
              </div>
              <p className="text-gray-600 text-xs mt-3">
                Přihlášením k odběru souhlasíte s{" "}
                <Link href="/privacy-policy" className="underline hover:text-gray-900">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
             <Logo width={170} height={34} />
            </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-gunmetal-200">Kontaktujte nás</h3>
                <p className="text-gray-300">604 544 776</p>
                <p className="text-gray-300">info@cartop.cz</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-gunmetal-200">Jsme k dispozici</h3>
                <p className="text-gray-300">Po-Pá 9.00-18.00 h</p>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold mb-4 text-gunmetal-200">Menu</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/nas-vyber" className="text-white hover:underline transition-colors text-sm">
                  Náš výběr
                </Link>
              </li>
              <li>
                <Link href="/produkty" className="text-white hover:underline transition-colors text-sm">
                  Produkty
                </Link>
              </li>
              <li>
                <Link href="/jak-to-funguje" className="text-white hover:underline transition-colors text-sm">
                  Jak to funguje
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-white hover:underline transition-colors text-sm">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Doporučené */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold mb-4 text-gunmetal-200">Doporučené</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/koupit" className="text-white hover:underline transition-colors text-sm">
                  Koupit
                </Link>
              </li>
              <li>
                <Link href="/pronajmout" className="text-white hover:underline transition-colors text-sm">
                  Pronajmout
                </Link>
              </li>
              <li>
                <Link href="/akcni-vozy" className="text-white hover:underline transition-colors text-sm">
                  Akční vozy
                </Link>
              </li>
              <li>
                <Link href="/nas-vyber" className="text-white hover:underline transition-colors text-sm">
                  Náš výběr
                </Link>
              </li>
              <li>
                <Link href="/nejnovejsi-nabidky" className="text-white hover:underline transition-colors text-sm">
                  Nejnovější nabídky
                </Link>
              </li>
            </ul>
          </div>

          {/* Náš výběr */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold mb-4 text-gunmetal-200">Náš výběr</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/premiove" className="text-white hover:underline transition-colors text-sm">
                  Prémiové
                </Link>
              </li>
              <li>
                <Link href="/mainstream" className="text-white hover:underline transition-colors text-sm">
                  Mainstream
                </Link>
              </li>
              <li>
                    <Link href="/sportovni" className="text-white hover:underline transition-colors text-sm">
                  Sportovní
                </Link>
              </li>
              <li>
                <Link href="/elektromobily" className="text-white hover:underline transition-colors text-sm   ">
                  Elektromobily
                </Link>
              </li>
              <li>
                <Link href="/uzitkove" className="text-white hover:underline transition-colors text-sm">
                  Užitkové
                </Link>
              </li>
              <li>
                <Link href="/hybridni" className="text-white hover:underline transition-colors text-sm">
                  Hybridní
                </Link>
              </li>
              <li>
                <Link href="/skladove" className="text-white hover:underline transition-colors text-sm">
                  Skladové
                </Link>
              </li>
              <li>
                <Link href="/nas-vyber" className="text-white hover:underline transition-colors text-sm">
                  Zobrazit vše
                </Link>
              </li>
            </ul>
          </div>

          {/* Značky */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold mb-4 text-gunmetal-200">Značky (32)</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/znacky/audi" className="text-white hover:underline transition-colors text-sm">
                  Audi
                </Link>
              </li>
              <li>
                <Link href="/znacky/bmw" className="text-white hover:underline transition-colors text-sm">
                  BMW
                </Link>
              </li>
              <li>
                <Link href="/znacky/skoda" className="text-white hover:underline transition-colors text-sm">
                  Škoda
                </Link>
              </li>
              <li>
                <Link href="/znacky/hyundai" className="text-white hover:underline transition-colors text-sm">
                  Hyundai
                </Link>
              </li>
              <li>
                <Link href="/znacky/mazda" className="text-white hover:underline transition-colors text-sm">
                  Mazda
                </Link>
              </li>
              <li>
                <Link href="/znacky/mercedes" className="text-white hover:underline transition-colors text-sm">
                  Mercedes
                </Link>
              </li>
              <li>
                      <Link href="/znacky/lexus" className="text-white hover:underline transition-colors text-sm">
                  Lexus
                </Link>
              </li>
              <li>
                <Link href="/znacky" className="text-white hover:underline transition-colors text-sm  ">
                  Zobrazit vše
                </Link>
              </li>
            </ul>
          </div>

          {/* Kategorie */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold mb-4 text-gunmetal-200">Kategorie</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/kategorie/suv" className="text-white hover:underline transition-colors text-sm">
                  SUV
                </Link>
              </li>
              <li>
                <Link href="/kategorie/kombi-mpv" className="text-white hover:underline transition-colors text-sm">
                  Kombi / MPV
                </Link>
              </li>
              <li>
                <Link href="/kategorie/hatchback" className="text-white hover:underline transition-colors text-sm">
                  Hatchback
                </Link>
              </li>
              <li>
                <Link href="/kategorie/sedan" className="text-white hover:underline transition-colors text-sm">
                  Sedan
                </Link>
              </li>
              <li>
                <Link href="/kategorie/kupe" className="text-white hover:underline transition-colors text-sm">
                  Kupé
                </Link>
              </li>
              <li>
                <Link href="/kategorie/kabriolet" className="text-white hover:underline transition-colors text-sm">
                  Kabriolet
                </Link>
              </li>
              <li>
                <Link href="/kategorie" className="text-white hover:underline transition-colors text-sm">
                  Zobrazit vše
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-12 pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-white">
              <p>© 2025 Cartop. All rights reserved.</p>
              <Link href="/privacy-policy" className="hover:underline transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:underline transition-colors">
                Terms of Service
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                  className="text-white hover:underline transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <XIcon />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
