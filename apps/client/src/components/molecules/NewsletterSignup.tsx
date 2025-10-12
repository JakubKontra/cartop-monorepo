import Link from "next/link"

export function NewsletterSignup() {
  return (
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
  )
}
